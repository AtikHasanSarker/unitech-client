"use server";

import { protectedServerFetch, serverMutation } from "./server";

export const getCart = async () => protectedServerFetch("cart");

export const addCartItem = async (productId, quantity = 1) =>
  serverMutation("cart", { productId, quantity });

export const updateCartItem = async (productId, quantity) =>
  serverMutation(`cart/${productId}`, { quantity }, "PATCH");

export const removeCartItem = async (productId) =>
  serverMutation(`cart/${productId}`, undefined, "DELETE");

export const clearCart = async () =>
  serverMutation("cart", undefined, "DELETE");