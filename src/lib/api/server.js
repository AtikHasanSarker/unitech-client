"use server";

import { redirect } from "next/navigation";
import { getUserToken } from "../session";


const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async (api) => {
  const res = await fetch(`${baseUrl}/api/${api}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
};

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  return header;
};

export const protectedServerFetch = async (api) => {
  const res = await fetch(`${baseUrl}/api/${api}`, {
    headers: await authHeader(),
  });
  if (!res.ok) {
    return null;
  }
  return handleStatusCode(res);
};

export const serverMutation = async (api, data, method = "POST") => {
  const res = await fetch(`${baseUrl}/api/${api}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  return handleStatusCode(res);
};

const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  }
  if (res.status === 403) {
    redirect("/unauthorized");
  }
  return res.json();
};
