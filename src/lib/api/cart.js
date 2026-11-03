"use server";

import { protectedServerFetch, userServerMutation } from "./core/server";

export const getCart = async () => protectedServerFetch("cart");

export const addCartItem = async (productId, quantity = 1) =>
  userServerMutation("cart", { productId, quantity });

export const updateCartItem = async (productId, quantity) =>
  userServerMutation(`cart/${productId}`, { quantity }, "PATCH");

export const removeCartItem = async (productId) =>
  userServerMutation(`cart/${productId}`, undefined, "DELETE");

export const clearCart = async () =>
  userServerMutation("cart", undefined, "DELETE");