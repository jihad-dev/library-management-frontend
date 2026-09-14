/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Loader2 } from "lucide-react";

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

interface BookCardProps {
  book: TBook;
  onReserve?: (book: TBook) => void;
  isReserving?: boolean; // ✅ লোডিং চেক করার জন্য নতুন প্রপস
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onReserve,
  isReserving = false,
}) => {
  const isAvailable = book.available_copies > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div>
        {/* Cover Image */}
        <div className="relative overflow-hidden bg-slate-800">
          <img
            src={
              book.cover_image ||
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
            }
            alt={book.title}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-indigo-300 border border-slate-700/60 backdrop-blur-md">
              {book.category}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
              ${book.price}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5">
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
      </div>

      {/* Footer / Action */}
      <div className="p-5 pt-0">
        <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
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
                <span className="text-rose-400 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* ✅ Loading State সহ আপডেট করা Reserve Button */}
          <button
            disabled={!isAvailable || isReserving}
            onClick={() => onReserve && onReserve(book)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              !isAvailable || isReserving
                ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-70"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 cursor-pointer"
            }`}
          >
            {isReserving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-300" />
                <span>Reserving...</span>
              </>
            ) : (
              <>
                <span>Reserve</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
