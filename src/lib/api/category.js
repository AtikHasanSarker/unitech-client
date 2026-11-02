"use server";

import { serverFetch } from "./server";

// Get all categories
export const getCategories = async () => {
  return serverFetch("categories");
};

// Get a single category
export const getCategoryById = async (categoryId) => {
  return serverFetch(`categories/${categoryId}`);
};