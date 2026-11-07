'use server'

import { serverFetch, serverMutation } from "./core/server";

export const getProducts = async (filters = {}, options = {}) => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== "") {
            query.set(key, String(value));
        }
    }
    const suffix = query.size ? `?${query.toString()}` : "";
    return serverFetch(`products${suffix}`, options);
};

export const getProductById = async (productId, options = {}) => {
    return serverFetch(`products/${productId}`, options);
}

export const addProduct = async (productData) => {
    return serverMutation('products', productData, 'POST');
}

export const updateProduct = async (productId, productData) => {
    return serverMutation(`products/${productId}`, productData, 'PATCH');
}

export const deleteProduct = async (productId) => {
    return serverMutation(`products/${productId}`, {}, 'DELETE');
}

