"use server";

import { serverFetch, serverMutation } from "./server";

// Create a new order
export const createOrder = async (orderData) => {
  return serverMutation("orders", orderData, "POST");
};

// Get logged-in user's orders
export const getMyOrders = async () => {
  return serverFetch("orders/my-orders");
};

// Get a single order by ID
export const getOrderById = async (orderId) => {
  return serverFetch(`orders/${orderId}`);
};

// Get all orders (Admin)
export const getAllOrders = async () => {
  return serverFetch("orders");
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId, status) => {
  return serverMutation(`orders/${orderId}/status`, { status }, "PATCH");
};
