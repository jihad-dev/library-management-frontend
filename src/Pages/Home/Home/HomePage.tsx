import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Layers,

  Star,
} from "lucide-react";
import { useGetAllBooksQuery } from "../../../Redux/features/admin/adminApi";

// backend model Interface
export interface TBook {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image: string;
  author: string;
  category: string;
  total_copies: number;
  available_copies: number;
  created_at?: string;
}

const HomePage: React.FC = () => {
  const {
    data: bookResponse,
    isLoading,
    isError,
  } = useGetAllBooksQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const books: TBook[] = bookResponse || [];

  // অনন্য ক্যাটাগরি তালিকা তৈরি
  const categories = [
    "All",
    ...Array.from(new Set(books.map((b) => b.category))),
  ];

  // সার্চ এবং ক্যাটাগরি ফিল্টারিং
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans overflow-hidden">
      {/* ----------------- Hero Section ----------------- */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center justify-center min-h-[75vh]">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-indigo-400 text-sm font-medium mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" /> Discover Your Next Favorite Read
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight"
        >
          Explore a Universe of <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Knowledge & Stories
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          Access thousands of physical & digital books from classic literature
          to modern technology. Reserve, borrow, and read effortlessly.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-xl mt-10 relative"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, author, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-xl backdrop-blur-md"
            />
          </div>
        </motion.div>

        {/* Categories Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-8"
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                  : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ----------------- Main Books Section ----------------- */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-indigo-400" />
              Featured Books
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Showing {filteredBooks.length} available books
            </p>
          </div>
        </div>

        {/* State Management Loading / Error */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-slate-900/50 animate-pulse border border-slate-800"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-16 bg-red-950/20 rounded-2xl border border-red-900/40">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-200">
              Failed to load books
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredBooks.length === 0 && (
          <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-300">
              No books found
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Try adjusting your search query.
            </p>
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isAvailable = book.available_copies > 0;

            return (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                {/* Book Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-800">
                  <img
                    src={
                      book.cover_image ||
                      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-indigo-300 border border-slate-700/60 backdrop-blur-md">
                      {book.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                      ${book.price}
                    </span>
                  </div>
                </div>

                {/* Book Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 font-medium">
                      By {book.author}
                    </p>
                    <p className="text-slate-500 text-xs mt-3 line-clamp-2 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* Footer Stats & Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs">
                      {isAvailable ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-300">
                            {book.available_copies} left
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span className="text-rose-400 font-medium">
                            Out of Stock
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      disabled={!isAvailable}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAvailable
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      Reserve <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ----------------- Stats & Highlights Section ----------------- */}
      <section className="border-t border-slate-800/80 bg-slate-900/30 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-sm">
            <BookOpen className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-slate-100">10,000+</h4>
            <p className="text-slate-400 text-sm mt-1">
              Books Available in Library
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-sm">
            <Layers className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-slate-100">50+</h4>
            <p className="text-slate-400 text-sm mt-1">Unique Categories</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60 backdrop-blur-sm">
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-slate-100">4.9 / 5</h4>
            <p className="text-slate-400 text-sm mt-1">Member Reader Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
