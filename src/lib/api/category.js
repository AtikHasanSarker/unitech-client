"use server";

import { cacheLife, cacheTag } from "next/cache";
import { serverFetch } from "./core/server";

// Get all categories
export const getCategories = async () => {
  return serverFetch("categories");
};

const getCachedCategoriesData = async () => {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag("categories");
  return getCategories();
};

export const getCachedCategories = async () => {
  return getCachedCategoriesData();
};

// Get a single category
export const getCategoryById = async (categoryId) => {
  return serverFetch(`categories/${categoryId}`);
};