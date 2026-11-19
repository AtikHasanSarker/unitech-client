'use server'

import { cacheLife, cacheTag, updateTag } from "next/cache";
import { serverFetch, serverMutation } from "./core/server";
import { requireAdmin } from "@/lib/session";

const getProductsPath = (filters = {}) => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== "") {
            query.set(key, String(value));
        }
    }
    const suffix = query.size ? `?${query.toString()}` : "";
    return `products${suffix}`;
};

export const getProducts = async (filters = {}, options = {}) => {
    return serverFetch(getProductsPath(filters), options);
};

const getCachedProductsData = async (filters) => {
    "use cache";
    cacheLife({ stale: 30, revalidate: 30, expire: 300 });
    cacheTag("products");
    return serverFetch(getProductsPath(filters));
};

export const getCachedProducts = async (filters = {}) => {
    return getCachedProductsData(filters);
};

export const getProductById = async (productId, options = {}) => {
    return serverFetch(`products/${productId}`, options);
}

export const addProduct = async (productData) => {
    await requireAdmin();
    const result = await serverMutation('products', productData, 'POST');
    if (result?.success) updateTag("products");
    return result;
}

export const updateProduct = async (productId, productData) => {
    await requireAdmin();
    const result = await serverMutation(`products/${productId}`, productData, 'PATCH');
    if (result?.success) updateTag("products");
    return result;
}

export const deleteProduct = async (productId) => {
    await requireAdmin();
    const result = await serverMutation(`products/${productId}`, {}, 'DELETE');
    if (result?.success) updateTag("products");
    return result;
}

