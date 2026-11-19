"use server";

import { protectedServerFetch, serverMutation } from "./core/server";
import { requireAdmin } from "@/lib/session";

// Create a new order
export const createOrder = async (orderData) => {
  return serverMutation("orders", orderData, "POST");
};

// Get logged-in user's orders
export const getMyOrders = async () => {
  return protectedServerFetch("orders/my-orders");
};

// Get a single order by ID
export const getOrderById = async (orderId) => {
  return protectedServerFetch(`orders/${orderId}`);
};

// Get all orders (Admin)
export const getAllOrders = async () => {
  await requireAdmin();
  return protectedServerFetch("orders");
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId, status) => {
  await requireAdmin();
  return serverMutation(`orders/${orderId}/status`, { status }, "PATCH");
};

export const updatePaymentStatus = async (orderId, paymentStatus) => {
  await requireAdmin();
  return serverMutation(
    `orders/${orderId}/payment-status`,
    { paymentStatus },
    "PATCH",
  );
};
