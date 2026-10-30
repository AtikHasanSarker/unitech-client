"use server";

import { serverFetch, serverMutation } from "./server";

// Get all categories
export const getCategories = async () => {
  return serverFetch("categories");
};

// Get a single category
export const getCategoryById = async (categoryId) => {
  return serverFetch(`categories/${categoryId}`);
};

// Create a new category
export const addCategory = async (categoryData) => {
  return serverMutation("categories", categoryData, "POST");
};

// Update a category
export const updateCategory = async (categoryId, categoryData) => {
  return serverMutation(`categories/${categoryId}`, categoryData, "PATCH");
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  return serverMutation(`categories/${categoryId}`, {}, "DELETE");
};
