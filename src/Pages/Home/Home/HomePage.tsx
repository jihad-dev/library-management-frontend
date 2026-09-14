/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Sparkles,
  XCircle,
  Layers,
  Star,
  ArrowRight,
  Compass,
  TrendingUp,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import BookCard, { TBook } from "../../../utils/BookCard";

// Props interface definition
interface HomePageProps {
  booksData?: any;
  isLoading: boolean;
  isError: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  booksData,
  isLoading,
  isError,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ডাটা Safely এক্সট্র্যাক্ট করা
  const books: TBook[] = Array.isArray(booksData)
    ? booksData
    : booksData?.data || [];

  // অনন্য ক্যাটাগরি তালিকা তৈরি
  const categories = [
    "All",
    ...Array.from(
      new Set(books.map((b) => b.category).filter((cat) => Boolean(cat))),
    ),
  ];

  // সার্চ এবং ক্যাটাগরি ফিল্টারিং
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReserve = (book: TBook) => {
    console.log("Book Reserved:", book);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans overflow-hidden">
      {/* ----------------- Hero Section ----------------- */}
      <section className="relative pt-14 pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[85vh]">
        {/* Dynamic Background Glowing Orbs */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating Accent Badges (Hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:flex absolute left-8 top-1/3 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl"
        >
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium">Trending Today</p>
            <p className="text-xs font-bold text-slate-100">
              500+ Books Borrowed
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:flex absolute right-8 top-1/2 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium">Top Rated</p>
            <p className="text-xs font-bold text-slate-100">
              4.9 / 5 Reader Score
            </p>
          </div>
        </motion.div>

        {/* Top Feature Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide mb-8 backdrop-blur-md shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>The Next-Gen Digital Library Engine</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-center max-w-4xl leading-[1.15]"
        >
          Unlock Boundless Knowledge &{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Timeless Stories
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl text-center leading-relaxed font-normal"
        >
          Immerse yourself in a curated ecosystem of physical and digital works.
          Reserve, track, and elevate your reading journey seamlessly.
        </motion.p>

        {/* Hero Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl mt-10 relative z-10"
        >
          <div className="relative flex items-center p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 focus-within:border-indigo-500/60 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300 shadow-2xl backdrop-blur-xl">
            <Search className="ml-4 w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by title, author, genre, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-4 py-3 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm sm:text-base font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-1.5 mr-2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
            <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 active:scale-95 shrink-0 cursor-pointer">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Quick Category Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-3xl mt-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <Compass className="w-3.5 h-3.5" /> Quick Filter By Category
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
                    : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trust Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-400 text-xs sm:text-sm font-medium"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant Reservation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Physical & Digital Access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Late Fee Guarantee</span>
          </div>
        </motion.div>
      </section>

      {/* ----------------- Main Books Section ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3 text-white">
              <BookOpen className="w-7 h-7 text-indigo-400" />
              Featured Catalog
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Showing {filteredBooks.length} available books for you
            </p>
          </div>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold uppercase tracking-wider"
            >
              Reset Category
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[380px] rounded-2xl bg-slate-900/50 animate-pulse border border-slate-800 p-4 flex flex-col justify-between"
              >
                <div className="w-full h-48 bg-slate-800/80 rounded-xl" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-slate-800/80 rounded w-3/4" />
                  <div className="h-3 bg-slate-800/50 rounded w-1/2" />
                </div>
                <div className="h-10 bg-slate-800/80 rounded-xl mt-6" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 bg-rose-950/20 rounded-2xl border border-rose-900/40">
            <XCircle className="w-12 h-12 text-rose-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-rose-200">
              Failed to load books
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Please check your network connection and try again.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredBooks.length === 0 && (
          <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800/80">
            <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-300">
              No matching books found
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Books Grid */}
        {!isLoading && !isError && filteredBooks.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onReserve={handleReserve} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ----------------- Stats & Highlights Section ----------------- */}
      <section className="border-t border-slate-800/80 bg-slate-900/40 py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/30 transition-all">
            <BookOpen className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <h4 className="text-3xl font-black text-slate-100">10,000+</h4>
            <p className="text-slate-400 text-sm mt-1">
              Physical & Digital Titles
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-purple-500/30 transition-all">
            <Layers className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h4 className="text-3xl font-black text-slate-100">50+</h4>
            <p className="text-slate-400 text-sm mt-1">
              Curated Genre Categories
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-amber-500/30 transition-all">
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-3 fill-amber-400" />
            <h4 className="text-3xl font-black text-slate-100">4.9 / 5</h4>
            <p className="text-slate-400 text-sm mt-1">Community Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
