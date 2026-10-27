'use server'

import { serverMutation } from "./server";

export const getProducts = async () => {
    return serverFetch('products');
}

export const addProduct = async (productData) => {
    return serverMutation('products', productData, 'POST');
}

export const updateProduct = async (productId, productData) => {
    return serverMutation(`products/${productId}`, productData, 'PUT');
}

export const deleteProduct = async (productId) => {
    return serverMutation(`products/${productId}`, {}, 'DELETE');
}

