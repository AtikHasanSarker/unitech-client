"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import {
  addCartItem,
  clearCart as clearUserCart,
  getCart,
  migrateGuestCart,
  removeCartItem,
  updateCartItem,
} from "@/lib/api/cart";
import { getProductById } from "@/lib/api/product";
import {
  clearGuestCart,
  GUEST_CART_STORAGE_KEY,
  readGuestCart,
  saveGuestCart,
} from "@/lib/cart-storage";

const CartContext = createContext(null);

function normalizeCartResponse(cart) {
  return (Array.isArray(cart?.items) ? cart.items : []).map((item) => ({
    ...item,
    id: item.productId,
    brand: item.brand || "",
    category: item.category || "",
    image: item.image || "/images/product-placeholder.png",
    stock: Number(item.stock) || 0,
  }));
}

function isAvailableProduct(product) {
  return (
    product &&
    product.status !== "Draft" &&
    Number.isFinite(Number(product.price)) &&
    Number.isInteger(Number(product.stock)) &&
    Number(product.stock) > 0
  );
}

function createCartItem(product, quantity) {
  return {
    ...product,
    id: String(product._id),
    productId: String(product._id),
    price: Number(product.price),
    stock: Number(product.stock),
    image: product.images?.[0] || product.image || "/images/product-placeholder.png",
    brand: product.brand || "",
    category: product.category || "",
    quantity,
  };
}

async function loadGuestCart(guestCart) {
  const resolvedItems = await Promise.all(
    guestCart.items.map(async (storedItem) => {
      try {
        const result = await getProductById(storedItem.productId);
        if (!result?.success) {
          if (result?.status === 404) return { type: "unavailable" };
          return { type: "unverified", storedItem };
        }
        const product = result?.success ? result.data : null;
        if (!isAvailableProduct(product)) return { type: "unavailable" };

        const quantity = Math.min(storedItem.quantity, Number(product.stock));
        return {
          type: "available",
          storedItem: { productId: storedItem.productId, quantity },
          cartItem: createCartItem(product, quantity),
          wasAdjusted: quantity !== storedItem.quantity,
        };
      } catch {
        return { type: "unverified", storedItem };
      }
    }),
  );

  const validItems = resolvedItems.filter((item) => item.type === "available");
  const unverifiedItems = resolvedItems.filter((item) => item.type === "unverified");
  const storedItems = [
    ...validItems.map((item) => item.storedItem),
    ...unverifiedItems.map((item) => item.storedItem),
  ];
  const unavailableCount = resolvedItems.filter(
    (item) => item.type === "unavailable",
  ).length;
  const adjustedCount = validItems.filter((item) => item.wasAdjusted).length;

  if (unavailableCount > 0 || adjustedCount > 0) {
    if (storedItems.length > 0) {
      saveGuestCart(storedItems);
    } else {
      clearGuestCart(guestCart.migrationId);
    }
  }

  return {
    items: [
      ...validItems.map((item) => item.cartItem),
      ...unverifiedItems.map(({ storedItem }) => ({
        id: storedItem.productId,
        productId: storedItem.productId,
        name: "Product details unavailable",
        price: 0,
        stock: 0,
        quantity: storedItem.quantity,
        image: "/images/product-placeholder.png",
        brand: "",
        category: "",
        isUnverified: true,
      })),
    ],
    unavailableCount,
    adjustedCount,
    unverifiedCount: unverifiedItems.length,
  };
}

async function loadAuthenticatedCart(retryCount = 0) {
  const guestCart = readGuestCart();
  let cartData = null;
  let notice = null;

  if (guestCart.items.length > 0) {
    try {
      const result = await migrateGuestCart(
        guestCart.items,
        guestCart.migrationId,
      );
      if (!result?.success) {
        throw new Error(result?.message || "Could not merge your guest cart.");
      }

      cartData = result.data;
      const cleared = clearGuestCart(guestCart.migrationId);
      const currentGuestCart = readGuestCart();
      if (
        !cleared &&
        currentGuestCart.items.length > 0 &&
        currentGuestCart.migrationId !== guestCart.migrationId &&
        retryCount < 2
      ) {
        return loadAuthenticatedCart(retryCount + 1);
      }
      if (result.skippedCount || result.cappedCount) {
        notice = {
          type: "error",
          message: "Some cart items were unavailable or adjusted to current stock.",
        };
      } else if (cleared) {
        notice = { type: "success", message: "Your cart has been synced." };
      } else {
        notice = {
          type: "error",
          message: "Some guest-cart changes could not be synced yet.",
        };
      }
    } catch (error) {
      notice = {
        type: "error",
        message: error?.message || "Could not merge your guest cart.",
      };
    }
  }

  if (!cartData) {
    const result = await getCart();
    if (!result?.success) {
      return {
        items: [],
        notice: {
          type: "error",
          message: result?.message || "Could not load your cart.",
        },
      };
    }
    cartData = result.data;
  }

  return { items: normalizeCartResponse(cartData), notice };
}

async function loadGuestCartState() {
  const guestCart = readGuestCart();
  const result = await loadGuestCart(guestCart);
  let notice = null;

  if (result.unavailableCount > 0 || result.adjustedCount > 0) {
    notice = {
      type: "error",
      message: "Unavailable cart items were removed or adjusted to current stock.",
    };
  } else if (result.unverifiedCount > 0) {
    notice = {
      type: "error",
      message: "Product details could not be verified. Your guest cart is preserved.",
    };
  }

  return { items: result.items, notice };
}

export function CartProvider({ children }) {
  const { data: session, isPending: sessionPending } = useSession();
  const userId = typeof session?.user?.id === "string" ? session.user.id : null;
  const ownerKey = userId ? `user:${userId}` : "guest";
  const [storedItems, setStoredItems] = useState([]);
  const [cartOwnerKey, setCartOwnerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const initializationRef = useRef(new Map());

  useEffect(() => {
    if (sessionPending) return;

    let active = true;
    let initialization = initializationRef.current.get(ownerKey);

    if (!initialization) {
      initialization = userId ? loadAuthenticatedCart() : loadGuestCartState();
      initializationRef.current.set(ownerKey, initialization);
      initialization.then(
        () => {
          if (initializationRef.current.get(ownerKey) === initialization) {
            initializationRef.current.delete(ownerKey);
          }
        },
        () => {
          if (initializationRef.current.get(ownerKey) === initialization) {
            initializationRef.current.delete(ownerKey);
          }
        },
      );
    }

    initialization.then(
      (result) => {
        if (!active) return;
        setStoredItems(result.items);
        setCartOwnerKey(ownerKey);
        setIsLoading(false);
        if (result.notice?.type === "success") toast.success(result.notice.message);
        if (result.notice?.type === "error") toast.error(result.notice.message);
      },
      () => {
        if (!active) return;
        setStoredItems([]);
        setCartOwnerKey(ownerKey);
        setIsLoading(false);
        toast.error("Could not load your cart.");
      },
    );

    return () => {
      active = false;
    };
  }, [ownerKey, sessionPending, userId]);

  useEffect(() => {
    if (sessionPending || userId) return undefined;

    const handleStorage = async (event) => {
      if (event.key !== GUEST_CART_STORAGE_KEY && event.key !== null) return;

      setIsLoading(true);
      try {
        const result = await loadGuestCartState();
        setStoredItems(result.items);
        setCartOwnerKey("guest");
        if (result.notice) toast.error(result.notice.message);
      } catch {
        toast.error("Could not refresh your guest cart.");
      } finally {
        setIsLoading(false);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [sessionPending, userId]);

  const isReady =
    !sessionPending && !isLoading && cartOwnerKey === ownerKey;
  const items = isReady ? storedItems : [];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  async function addItem(productId, quantity = 1) {
    if (!isReady) {
      toast.error("Your cart is still loading. Please try again.");
      return false;
    }
    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      toast.error("Choose a valid quantity.");
      return false;
    }

    if (userId) {
      try {
        const result = await addCartItem(productId, quantity);
        if (!result?.success) {
          toast.error(result?.message || "Could not add this product to your cart.");
          return false;
        }
        setStoredItems(normalizeCartResponse(result.data));
        toast.success("Product added to your cart.");
        return true;
      } catch {
        toast.error("Could not add this product to your cart.");
        return false;
      }
    }

    try {
      const productResult = await getProductById(productId);
      const product = productResult?.success ? productResult.data : null;
      if (!isAvailableProduct(product)) {
        toast.error(productResult?.message || "This product is unavailable.");
        return false;
      }

      const guestCart = readGuestCart();
      const currentItem = guestCart.items.find(
        (item) => item.productId === productId,
      );
      const nextQuantity = (currentItem?.quantity || 0) + quantity;
      if (nextQuantity > Number(product.stock)) {
        toast.error(`Only ${product.stock} units are available.`);
        return false;
      }

      const nextGuestItems = currentItem
        ? guestCart.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: nextQuantity }
              : item,
          )
        : [...guestCart.items, { productId, quantity }];
      if (!saveGuestCart(nextGuestItems)) {
        toast.error("Could not save your cart in this browser.");
        return false;
      }

      setStoredItems((current) => {
        const matchingItem = current.find((item) => item.id === productId);
        const cartItem = createCartItem(product, nextQuantity);
        return matchingItem
          ? current.map((item) => (item.id === productId ? cartItem : item))
          : [...current, cartItem];
      });
      toast.success("Product added to your cart.");
      return true;
    } catch {
      toast.error("Could not add this product to your cart.");
      return false;
    }
  }

  async function setQuantity(productId, quantity) {
    if (!isReady || !Number.isSafeInteger(quantity) || quantity <= 0) {
      return false;
    }

    if (userId) {
      try {
        const result = await updateCartItem(productId, quantity);
        if (!result?.success) {
          toast.error(result?.message || "Could not update item quantity.");
          return false;
        }
        setStoredItems(normalizeCartResponse(result.data));
        toast.success("Cart quantity updated.");
        return true;
      } catch {
        toast.error("Could not update item quantity.");
        return false;
      }
    }

    try {
      const guestCart = readGuestCart();
      const currentItem = guestCart.items.find(
        (item) => item.productId === productId,
      );
      if (!currentItem) return false;

      const productResult = await getProductById(productId);
      const product = productResult?.success ? productResult.data : null;
      if (!isAvailableProduct(product)) {
        toast.error("This product is no longer available.");
        return false;
      }
      if (quantity > Number(product.stock)) {
        toast.error(`Only ${product.stock} units are available.`);
        return false;
      }

      const nextGuestItems = guestCart.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      );
      if (!saveGuestCart(nextGuestItems)) {
        toast.error("Could not save your cart in this browser.");
        return false;
      }

      setStoredItems((current) =>
        current.map((item) =>
          item.id === productId ? createCartItem(product, quantity) : item,
        ),
      );
      toast.success("Cart quantity updated.");
      return true;
    } catch {
      toast.error("Could not update item quantity.");
      return false;
    }
  }

  async function removeItem(productId) {
    if (!isReady) return false;

    if (userId) {
      try {
        const result = await removeCartItem(productId);
        if (!result?.success) {
          toast.error(result?.message || "Could not remove this item.");
          return false;
        }
        setStoredItems(normalizeCartResponse(result.data));
      } catch {
        toast.error("Could not remove this item.");
        return false;
      }
    } else {
      const guestCart = readGuestCart();
      const nextGuestItems = guestCart.items.filter(
        (item) => item.productId !== productId,
      );
      const saved = nextGuestItems.length
        ? saveGuestCart(nextGuestItems)
        : clearGuestCart(guestCart.migrationId);
      if (!saved) {
        toast.error("Could not update your cart in this browser.");
        return false;
      }
      setStoredItems((current) => current.filter((item) => item.id !== productId));
    }

    toast.success("Item removed from your cart.");
    return true;
  }

  async function clearCart() {
    if (!isReady) return false;

    if (userId) {
      try {
        const result = await clearUserCart();
        if (!result?.success) {
          toast.error(result?.message || "Could not clear your cart.");
          return false;
        }
      } catch {
        toast.error("Could not clear your cart.");
        return false;
      }
    } else {
      const guestCart = readGuestCart();
      if (guestCart.items.length && !clearGuestCart(guestCart.migrationId)) {
        toast.error("Could not clear your cart in this browser.");
        return false;
      }
    }

    setStoredItems([]);
    toast.success("Cart cleared.");
    return true;
  }

  function resetAfterLogout() {
    setStoredItems([]);
    setCartOwnerKey(null);
    setIsLoading(true);
  }

  async function refreshCart() {
    if (sessionPending) return false;

    try {
      const result = userId
        ? await loadAuthenticatedCart()
        : await loadGuestCartState();
      setStoredItems(result.items);
      setCartOwnerKey(ownerKey);
      if (result.notice?.type === "success") toast.success(result.notice.message);
      if (result.notice?.type === "error") toast.error(result.notice.message);
      return true;
    } catch {
      toast.error("Could not refresh your cart.");
      return false;
    }
  }

  return (
    <CartContext.Provider
      value={{ items, itemCount, isLoading: !isReady, isReady, addItem, setQuantity, removeItem, clearCart, refreshCart, resetAfterLogout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within a CartProvider");
  return cart;
}