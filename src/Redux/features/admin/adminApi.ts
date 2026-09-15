/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
export interface CreateBookPayload {
   title: string;
   author: string;
   description: string;
   category: string;
   price: number;
   total_copies: number;
   cover_image: string;
   created_at?: string;
}
export interface UpdateBookPayload {
  id?: number | string;
  title?: string;
  author?: string;
  description?: string;
  category?: string;
  price?: number;
  total_copies?: number;
  available_copies?: number;
  cover_image?: string;
}
const adminApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      // Get all users
      getAllUsers: builder.query({
         query: () => ({
            url: "/users/all-user",
            method: "GET",
         }),
         providesTags: ["users"],
      }),
      createBook: builder.mutation<any, CreateBookPayload>({
         query: (bookData) => ({
            url: "/admin/create_book",
            method: "POST",
            body: bookData,
         }),
         invalidatesTags: ["books"], // Automatically updates book lists across the app
      }),
      getAllBooks: builder.query({
         query: () => ({
            url: "/books/all",
            method: "GET",
         }),
         providesTags: ["books"],
      }),
      // 1. Delete Book Mutation
      deleteBook: builder.mutation<{ success: boolean; message?: string }, number | string>({
         query: (bookId) => ({
            url: `/admin/delete_book/${bookId}`, // Adjust URL path to match your backend route
            method: "DELETE",
         }),
         invalidatesTags: ["books"], // Automatically refetches getAllBooks
      }),

      // 2. Update Book Mutation
      updateBook: builder.mutation<any, UpdateBookPayload>({
         query: ({ id, ...updatedData }) => ({
            url: `/admin/update_book/${id}`, // Adjust URL path to match your backend route
            method: "PUT", // Or "PATCH" depending on backend implementation
            body: updatedData,
         }),
         invalidatesTags: ["books"], // Automatically refetches getAllBooks
      }),

      // Reserve Book Mutation
      reserveBook: builder.mutation({
         query: (bookId: string | number) => ({
            url: `/reserve/${bookId}`,
            method: "POST",
         }),
         invalidatesTags: ["books", "Reservation"],
      }),

      getMyReservations: builder.query({
         query: () => ({
            url: "/reserve/my",
            method: "GET",
         }),
         providesTags: ["Reservation"],
      }),

      cancelReservation: builder.mutation({
         query: (reservationId: string | number) => ({
            url: `/reserve/cancel/${reservationId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["Reservation"],
      }),

      // Create Issue Mutation
      createIssue: builder.mutation({
         query: (data: { user_id: number; book_id: number }) => ({
            url: "/admin/create_issue",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Issue", "books", "Reservation"],
      }),
      getMyIssuedBooks: builder.query({
         query: () => ({
            url: "/my_issued_books",
            method: "GET",
         }),
         providesTags: ["Issue"],
      }),
      // Get all admins
      getAllAdmins: builder.query({
         query: () => ({
            url: "/users/all-admin",
            method: "GET",
         }),
         providesTags: ["admins"],
         transformResponse: (response: any) => response?.data,
      }),

      // Change user status (Active / Blocked)
      changeStatus: builder.mutation({
         query: (data: { id: string; status: string }) => ({
            url: `/users/status/${data?.id}`,
            method: "PATCH",
            body: {
               status: data?.status,
            },
         }),
         invalidatesTags: ["users"],
      }),

      // Create admin
      createAdmin: builder.mutation({
         query: (data: any) => ({
            url: "/users/create-user",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["admins", "users"],
      }),

      // Get single admin
      getSingleAdmin: builder.query({
         query: (id: string) => ({
            url: `/users/admin/${id}`,
            method: "GET",
         }),
         providesTags: ["admins"],
      }),

      // Delete admin
      deleteAdmin: builder.mutation({
         query: (id: string) => ({
            url: `/users/admin/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["admins"],
      }),

      // Delete user
      deleteUser: builder.mutation({
         query: (id: string) => ({
            url: `/users/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["users"],
      }),
   }),
});

export const {
   useGetAllUsersQuery,
   useGetAllAdminsQuery,
   useChangeStatusMutation,
   useCreateAdminMutation,
   useGetSingleAdminQuery,
   useDeleteAdminMutation,
   useDeleteUserMutation,
   useGetAllBooksQuery,
   useReserveBookMutation,
   useGetMyReservationsQuery,
   useCancelReservationMutation,
   useCreateIssueMutation,
   useGetMyIssuedBooksQuery,
   useCreateBookMutation,
   useDeleteBookMutation,
   useUpdateBookMutation
} = adminApi;