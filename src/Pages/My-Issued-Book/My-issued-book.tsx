/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetMyIssuedBooksQuery } from "../../Redux/features/admin/adminApi";

const MyIssuedBook = () => {
  const {
    data: issueBooksResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMyIssuedBooksQuery(undefined);

  // Safe extraction of books array
  const books = Array.isArray(issueBooksResponse)
    ? issueBooksResponse
    : issueBooksResponse?.data || [];

  // Helper for clean date formatting
  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper to check if a book is overdue
  const isOverdue = (dueDate: any) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full"
        />
        <p className="mt-4 text-slate-400 font-medium text-sm">
          Fetching your issued books...
        </p>
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    const errorMessage =
      (error as any)?.data?.message ||
      (error as any)?.error ||
      (error as any)?.message ||
      "Failed to load issued books.";

    return (
      <div className="flex items-center justify-center min-h-[350px] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-950/40 border border-red-800/50 rounded-2xl p-6 text-center max-w-md w-full shadow-2xl backdrop-blur-md"
        >
          <div className="w-12 h-12 bg-red-900/40 text-red-400 border border-red-700/50 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
            !
          </div>
          <h3 className="text-lg font-bold text-red-300 mb-1">
            Something Went Wrong
          </h3>
          <p className="text-sm text-red-400/80 mb-5">{errorMessage}</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => refetch()}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-xl shadow-lg transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            My Issued Books
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your current borrowed library items
          </p>
        </div>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold px-3.5 py-1.5 rounded-full text-xs shadow-inner"
        >
          {books.length} Active
        </motion.span>
      </div>

      {/* Empty State */}
      {books.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#0b0f19]/60 border border-slate-800 rounded-2xl p-12 text-center backdrop-blur-sm"
        >
          <div className="text-4xl mb-3">📚</div>
          <h3 className="text-base font-semibold text-slate-200">
            No Issued Books
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            You currently have no active borrowed books from the library.
          </p>
        </motion.div>
      ) : (
        /* Dark Theme Table Container */
        <div className="bg-[#0b0f19]/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-4 px-6">Book ID</th>
                  <th className="py-4 px-6">Issued Date</th>
                  <th className="py-4 px-6">Due Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Fine Amount</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-sm font-medium">
                <AnimatePresence>
                  {books.map((item: any, index: any) => {
                    const overdue = isOverdue(item.due_date);

                    return (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Book ID */}
                        <td className="py-4 px-6 font-semibold text-indigo-400">
                          #{item.book_id}
                        </td>

                        {/* Issue Date */}
                        <td className="py-4 px-6 text-slate-300">
                          {formatDate(item.issue_date)}
                        </td>

                        {/* Due Date */}
                        <td className="py-4 px-6">
                          <span
                            className={
                              overdue
                                ? "text-red-400 font-semibold"
                                : "text-slate-300"
                            }
                          >
                            {formatDate(item.due_date)}
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                              overdue
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : item.status === "issued"
                                  ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                overdue
                                  ? "bg-red-400 animate-pulse"
                                  : item.status === "issued"
                                    ? "bg-indigo-400"
                                    : "bg-emerald-400"
                              }`}
                            />
                            {overdue ? "Overdue" : item.status}
                          </span>
                        </td>

                        {/* Fine Amount */}
                        <td className="py-4 px-6">
                          {item.fine_amount > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold">
                              ${item.fine_amount.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-semibold">
                              $0.00
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MyIssuedBook;
