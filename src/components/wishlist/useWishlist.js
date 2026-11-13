"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/api/wishlist";
import {
  announceWishlistChange,
  readGuestWishlist,
  saveGuestWishlist,
  WISHLIST_CHANGE_EVENT,
} from "@/lib/wishlist-storage";

function getProductId(item) {
  const productId = item?.productId;
  const id =
    typeof productId === "object"
      ? productId?._id || productId?.id
      : productId;

  return id ? String(id) : null;
}

export function useWishlist() {
  const { data: session, isPending: sessionPending } = useSession();
  const userId =
    typeof session?.user?.id === "string" ? session.user.id : null;
  const [productIds, setProductIds] = useState([]);
  const [loadedUserId, setLoadedUserId] = useState(undefined);
  const productIdsRef = useRef([]);
  const pendingIdsRef = useRef(new Set());

  const updateProductIds = useCallback((update) => {
    const nextProductIds =
      typeof update === "function" ? update(productIdsRef.current) : update;
    productIdsRef.current = nextProductIds;
    setProductIds(nextProductIds);
  }, []);

  useEffect(() => {
    const handleWishlistChange = (event) => {
      if (Array.isArray(event.detail)) {
        updateProductIds(event.detail);
      }
    };

    window.addEventListener(WISHLIST_CHANGE_EVENT, handleWishlistChange);
    return () =>
      window.removeEventListener(WISHLIST_CHANGE_EVENT, handleWishlistChange);
  }, [updateProductIds]);

  useEffect(() => {
    if (sessionPending) return undefined;

    let active = true;

    const loadWishlist = async () => {
      if (!active) return;
      if (!userId) {
        updateProductIds(readGuestWishlist());
        return;
      }

      const result = await getWishlist();
      if (!active) return;
      if (!result?.success) {
        toast.error(result?.message || "Could not load your wishlist.");
        updateProductIds([]);
        return;
      }

      const items = result.data?.items;
      if (!Array.isArray(items)) {
        toast.error("Your wishlist response was invalid. Please try again.");
        updateProductIds([]);
        return;
      }

      updateProductIds(items.map(getProductId).filter(Boolean));
    };

    loadWishlist()
      .catch(() => {
        if (active) {
          updateProductIds([]);
          toast.error("Could not load your wishlist.");
        }
      })
      .finally(() => {
        if (active) setLoadedUserId(userId);
      });

    return () => {
      active = false;
    };
  }, [sessionPending, updateProductIds, userId]);

  const removeProduct = useCallback(
    async (productId) => {
      const id = String(productId);
      const isLoading = sessionPending || loadedUserId !== userId;
      if (isLoading) {
        toast.error("Your wishlist is still loading. Please try again.");
        return false;
      }
      if (pendingIdsRef.current.has(id)) return false;

      pendingIdsRef.current.add(id);
      try {
        if (userId) {
          const result = await removeFromWishlist(id);
          if (!result?.success) {
            toast.error(result?.message || "Could not remove this product.");
            return false;
          }
          announceWishlistChange(
            productIdsRef.current.filter((savedId) => savedId !== id),
          );
        } else {
          const nextProductIds = productIdsRef.current.filter(
            (savedId) => savedId !== id,
          );
          if (!saveGuestWishlist(nextProductIds)) {
            throw new Error("Could not save your wishlist in this browser.");
          }
        }

        updateProductIds((current) => current.filter((savedId) => savedId !== id));
        return true;
      } catch {
        toast.error("Could not remove this product.");
        return false;
      } finally {
        pendingIdsRef.current.delete(id);
      }
    },
    [loadedUserId, sessionPending, updateProductIds, userId],
  );

  const toggleProduct = useCallback(
    async (productId) => {
      const id = String(productId);
      const isLoading = sessionPending || loadedUserId !== userId;
      if (isLoading) {
        toast.error("Your wishlist is still loading. Please try again.");
        return false;
      }
      if (pendingIdsRef.current.has(id)) return false;

      if (productIdsRef.current.includes(id)) {
        return removeProduct(id);
      }

      pendingIdsRef.current.add(id);
      try {
        if (userId) {
          const result = await addToWishlist(id);
          if (!result?.success) {
            toast.error(result?.message || "Could not update your wishlist.");
            return false;
          }
          announceWishlistChange([...productIdsRef.current, id]);
        } else {
          if (!saveGuestWishlist([...productIdsRef.current, id])) {
            throw new Error("Could not save your wishlist in this browser.");
          }
        }

        updateProductIds((current) =>
          current.includes(id) ? current : [...current, id],
        );
        return true;
      } catch {
        toast.error("Could not update your wishlist.");
        return false;
      } finally {
        pendingIdsRef.current.delete(id);
      }
    },
    [
      loadedUserId,
      removeProduct,
      sessionPending,
      updateProductIds,
      userId,
    ],
  );

  return {
    productIds,
    isLoading: sessionPending || loadedUserId !== userId,
    removeProduct,
    toggleProduct,
  };
}
