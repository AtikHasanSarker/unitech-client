"use server";

import { serverFetch, serverMutation } from "./server";

// Get user's wishlist
export const getWishlist = async () => {
  return serverFetch("wishlist");
};

// Add product to wishlist
export const addToWishlist = async (productId) => {
  return serverMutation(`wishlist/${productId}`, {}, "POST");
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
  return serverMutation(`wishlist/${productId}`, {}, "DELETE");
};
