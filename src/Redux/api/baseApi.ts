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

// ১. মূল বেস কুয়েরি
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // কুকি (Refresh Token) আদান-প্রদানের জন্য জরুরি
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      // ⚠️ সংশোধন: FastAPI এর জন্য "Bearer " যুক্ত করা আবশ্যক
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// ২. রিফ্রেশ টোকেন সহ অ্যাডভান্সড বেস কুয়েরি
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // ৪০৪ এবং ৪০৩ এররের জন্য টোস্ট মেসেজ
  if (result?.error?.status === 404) {
    toast.error((result?.error?.data as any)?.detail || "Resource not found");
  }
  if (result?.error?.status === 403) {
    toast.error((result?.error?.data as any)?.detail || "Forbidden access");
  }

  // ৩. যদি Access Token এক্সপায়ার হয়ে যায় (401 Unauthorized)
  if (result?.error?.status === 401) {
    const url = typeof args === "string" ? args : args.url;

    // লগইন বা রেজিস্টার এরর হলে রিফ্রেশ টোকেন চালানোর দরকার নেই
    if (url.includes("/auth/login") || url.includes("/auth/register")) {
      return result;
    }

    try {
      // ব্যাকএন্ডের /auth/refresh-token এন্ডপয়েন্টে অটোমেটিক কুকি পাঠাবে
      const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        const newAccessToken = data?.access_token;

        if (newAccessToken) {
          // রিডাক্স স্টোর থেকে বর্তমান ইউজার নেওয়া
          const currentUser = (api.getState() as RootState).auth.user;

          // নতুন টোকেন রেডাক্স স্টোরে সেট করা
          api.dispatch(
            setUser({
              user: currentUser,
              token: newAccessToken,
            })
          );

          // ফেইল হওয়া অরিজিনাল রিকোয়েস্টটি নতুন টোকেন দিয়ে রি-ট্রাই করা
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } else {
        // রিফ্রেশ টোকেন ব্যর্থ হলে সেশন ক্লিয়ার
        api.dispatch(logout());
      }
    } catch {
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
    "foods",
    "cart",
    "orders",
    "notifications",
    "reviews",
    "books",
  ],
  endpoints: () => ({}),
});