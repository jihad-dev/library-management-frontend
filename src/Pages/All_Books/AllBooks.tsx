/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, XCircle, Sparkles, Layers } from "lucide-react";
import { toast } from "sonner";

import {
  useGetAllBooksQuery,
  useReserveBookMutation,
} from "../../Redux/features/admin/adminApi";
import BookCard, { TBook } from "../../utils/BookCard";
import { useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";

const AllBooks: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {
    data: bookResponse,
    isLoading,
    isError,
  } = useGetAllBooksQuery(undefined);
  const [reserveBook] = useReserveBookMutation();

  // Local state for Search & Category filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 特定 বইয়ের লোডিং স্টেট ট্র্যাক করার জন্য ID স্টেট
  const [reservingBookId, setReservingBookId] = useState<
    string | number | null
  >(null);

  // Extract books array safely (supports both direct array or wrapped data object)
  const books: TBook[] = Array.isArray(bookResponse)
    ? bookResponse
    : bookResponse?.data || [];

  // Extract dynamic categories list
  const categories = [
    "All",
    ...Array.from(new Set(books.map((b) => b.category).filter(Boolean))),
  ];

  // Filter logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
const handleReserve = async (book: TBook) => {
  if (!user) {
    toast.error("রিজার্ভ করতে প্রথমে লগইন করুন!");
    return navigate("/login");
  }
  const targetId = book.id;
  if (!targetId) {
    toast.error("বইয়ের ID পাওয়া যায়নি!");
    return;
  }
  setReservingBookId(targetId);
  const toastId = toast.loading("বইটি রিজার্ভ করা হচ্ছে...");
  try {
    await reserveBook(targetId).unwrap();
    toast.success("বইটি সফলভাবে রিজার্ভ করা হয়েছে!", { id: toastId });
  } catch (error: any) {
    console.error("Reserve error:", error);
    const errorMsg =
      error?.data?.detail ||
      error?.data?.message ||
      "রিজার্ভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

    toast.error(errorMsg, { id: toastId });
  } finally {
    setReservingBookId(null);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-2">
            <Sparkles className="w-4 h-4" /> Discover Knowledge
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Library <span className="text-indigo-500">Catalog</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
            Explore our curated collection of books, research materials, and
            digital archives.
          </p>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative sm:w-48">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
            >
              {categories.map((cat, idx) => (
                <option
                  key={idx}
                  value={cat}
                  className="bg-slate-900 text-slate-200"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading Skeleton State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[380px] bg-slate-900/50 border border-slate-800/80 rounded-2xl animate-pulse p-4 flex flex-col justify-between"
            >
              <div className="w-full h-48 bg-slate-800 rounded-xl mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800/60 rounded w-1/2" />
              </div>
              <div className="h-8 bg-slate-800 rounded-xl mt-4" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-rose-500/20">
          <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Failed to load books</h3>
          <p className="text-xs text-slate-400 mt-1">
            Please check your network connection and try again.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredBooks.length === 0 && (
        <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No books found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try resetting your search term or category filters.
          </p>
        </div>
      )}

      {/* Books Card Grid */}
      {!isLoading && !isError && filteredBooks.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onReserve={handleReserve}
                // ✅ String() দিয়ে উভয় ID রূপান্তর করে তুলনা নিশ্চিত করা হয়েছে
                isReserving={String(reservingBookId) === String(book.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default AllBooks;
