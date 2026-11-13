export const GUEST_WISHLIST_STORAGE_KEY = "unitech:guest-wishlist";
export const WISHLIST_CHANGE_EVENT = "unitech:wishlist-change";

const isProductId = (id) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

export function readGuestWishlist() {
  if (typeof window === "undefined") return [];

  const savedWishlist = window.localStorage.getItem(
    GUEST_WISHLIST_STORAGE_KEY,
  );
  if (!savedWishlist) return [];

  try {
    const productIds = JSON.parse(savedWishlist);
    return Array.isArray(productIds)
      ? [...new Set(productIds.filter(isProductId))]
      : [];
  } catch {
    window.localStorage.removeItem(GUEST_WISHLIST_STORAGE_KEY);
    return [];
  }
}

export function saveGuestWishlist(productIds) {
  if (typeof window === "undefined") return false;

  const savedProductIds = [...new Set(productIds.filter(isProductId))];
  window.localStorage.setItem(
    GUEST_WISHLIST_STORAGE_KEY,
    JSON.stringify(savedProductIds),
  );
  announceWishlistChange(savedProductIds);
  return true;
}

export function announceWishlistChange(productIds) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(WISHLIST_CHANGE_EVENT, { detail: productIds }),
  );
}
