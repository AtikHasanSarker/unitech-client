"use server";

import { getUserToken } from "../../session";

const baseUrl = process.env.NEXT_SERVER_URL;

const getApiUrl = (api) => {
  if (!baseUrl) {
    throw new Error("NEXT_SERVER_URL is not configured.");
  }
  return `${baseUrl.replace(/\/+$/, "")}/api/${api}`;
};


const parseResponse = async (response) => {
  const payload = await response.json().catch(() => ({
    success: false,
    message: "The server returned an invalid response.",
  }));

  return response.ok ? payload : { ...payload, success: false, status: response.status };
};

export const serverFetch = async (api) => {
  const response = await fetch(getApiUrl(api));
  return parseResponse(response);
};


export const authHeader = async () => {
  try {
    const token = await getUserToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
};

export const protectedServerFetch = async (api) => {
  const response = await fetch(getApiUrl(api), {
    headers: await authHeader(),
    cache: "no-store",
  });
  return parseResponse(response);
};


export const serverMutation = async (api, data, method = "POST", extraHeaders = {}) => {
  const response = await fetch(getApiUrl(api), {
    method,
    headers: {
      ...extraHeaders,
      ...(await authHeader()),
      "content-type": "application/json",
    },
    ...(data === undefined ? {} : { body: JSON.stringify(data) }),
  });

  return parseResponse(response);
};

