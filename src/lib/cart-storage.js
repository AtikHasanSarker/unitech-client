export const GUEST_CART_STORAGE_KEY = "unitech:guest-cart";

const EMPTY_GUEST_CART = { items: [], migrationId: null };

function getStorage() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function createMigrationId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeItems(items) {
  const quantities = new Map();

  for (const item of items) {
    if (
      !item ||
      typeof item.productId !== "string" ||
      !/^[a-f\d]{24}$/i.test(item.productId) ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      continue;
    }

    const quantity = (quantities.get(item.productId) || 0) + item.quantity;
    if (Number.isSafeInteger(quantity)) {
      quantities.set(item.productId, quantity);
    }
  }

  return [...quantities].map(([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

export function readGuestCart() {
  const storage = getStorage();
  if (!storage) return EMPTY_GUEST_CART;

  try {
    const storedValue = storage.getItem(GUEST_CART_STORAGE_KEY);
    if (!storedValue) return EMPTY_GUEST_CART;

    const parsed = JSON.parse(storedValue);
    if (!parsed || !Array.isArray(parsed.items)) {
      storage.removeItem(GUEST_CART_STORAGE_KEY);
      return EMPTY_GUEST_CART;
    }

    const items = normalizeItems(parsed.items);
    if (items.length === 0) {
      storage.removeItem(GUEST_CART_STORAGE_KEY);
      return EMPTY_GUEST_CART;
    }

    const migrationId =
      typeof parsed.migrationId === "string" && parsed.migrationId
        ? parsed.migrationId
        : createMigrationId();
    if (
      migrationId !== parsed.migrationId ||
      JSON.stringify(items) !== JSON.stringify(parsed.items)
    ) {
      try {
        storage.setItem(
          GUEST_CART_STORAGE_KEY,
          JSON.stringify({ items, migrationId }),
        );
      } catch {
        return { items, migrationId };
      }
    }

    return { items, migrationId };
  } catch {
    try {
      storage.removeItem(GUEST_CART_STORAGE_KEY);
    } catch {
      return EMPTY_GUEST_CART;
    }
    return EMPTY_GUEST_CART;
  }
}

export function saveGuestCart(items) {
  const storage = getStorage();
  if (!storage) return null;

  const normalizedItems = normalizeItems(items);
  if (normalizedItems.length === 0) {
    try {
      storage.removeItem(GUEST_CART_STORAGE_KEY);
      return null;
    } catch {
      return null;
    }
  }

  const migrationId = createMigrationId();
  try {
    storage.setItem(
      GUEST_CART_STORAGE_KEY,
      JSON.stringify({ items: normalizedItems, migrationId }),
    );
    return migrationId;
  } catch {
    return null;
  }
}

export function clearGuestCart(expectedMigrationId) {
  const storage = getStorage();
  if (!storage) return false;

  const currentCart = readGuestCart();
  if (
    expectedMigrationId &&
    currentCart.migrationId !== expectedMigrationId
  ) {
    return false;
  }

  try {
    storage.removeItem(GUEST_CART_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}