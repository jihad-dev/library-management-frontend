/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const BASE_URL = "https://library-management-backend-g9wi.onrender.com";

// ১. মূল বেস কুয়েরি
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      // ⚠️ যদি টোকেনে আগে থেকেই 'Bearer ' থাকে তা মুছে দিয়ে ক্লিন Bearer টোকেন বসানো
      const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;
      headers.set("authorization", `Bearer ${cleanToken}`);
    }
    return headers;
  },
});

// ২. রিফ্রেশ টোকেন সহ বেস কুয়েরি
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error((result?.error?.data as any)?.detail || "Resource not found");
  }
  if (result?.error?.status === 403) {
    toast.error((result?.error?.data as any)?.detail || "Forbidden access");
  }

  // ৩. যদি Access Token এক্সপায়ার হয় (401 Unauthorized)
  if (result?.error?.status === 401) {
    const url = typeof args === "string" ? args : args.url;

    if (url.includes("/auth/login") || url.includes("/auth/register")) {
      return result;
    }

    // ⚠️ রিফ্রেশ রিকোয়েস্টে পুরানো Authorization হেডার পাঠানো যাবে না
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        headers: { authorization: "" },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const data = refreshResult.data as { access_token: string };
      const newAccessToken = data?.access_token;

      if (newAccessToken) {
        const currentUser = (api.getState() as RootState).auth.user;

        // রিডাক্স স্টোর আপডেট
        api.dispatch(
          setUser({
            user: currentUser,
            token: newAccessToken,
          })
        );

        // নতুন টোকেন দিয়ে ফেইলড রিকোয়েস্টটি পুনরায় চালানো
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// ৪. মূল API সার্ভিস তৈরি
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "admins",
    "users",
    "categories",
    "Reservation",
    "foods",
    "cart",
    "orders",
    "notifications",
    "reviews",
    "books",
    "Issue"
  ],
  endpoints: () => ({}),
});