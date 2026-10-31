"use server";

import { protectedServerFetch, serverMutation } from "./server";

// Get user's wishlist
export const getWishlist = async () => {
  return protectedServerFetch("wishlist");
};

// Add product to wishlist
export const addToWishlist = async (productId) => {
  return serverMutation(`wishlist/${productId}`, {}, "POST");
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
  return serverMutation(`wishlist/${productId}`, {}, "DELETE");
};
