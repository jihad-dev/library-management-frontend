/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import { IUser } from "../../../types/user.types";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login", // আপনার ব্যাকএন্ড এন্ডপয়েন্ট URL
                method: "POST",
                body: credentials,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }),
            // ব্যাকএন্ড রেসপন্স যা-ই আসুক না কেন স্ট্যান্ডার্ডাইজড করে পাঠানো
            transformResponse: (response: any) => response,
        }),
        // register
        register: builder.mutation({
            query: (userInfo: any) => ({
                url: '/auth/register',
                method: 'POST',
                body: userInfo,
            }),
        }),
        getSingleUser: builder.query<IUser, string>({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
        }),

    }),
})

export const { useLoginMutation, useGetSingleUserQuery, useRegisterMutation } = authApi;
