/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useCreateIssueMutation } from "../../Redux/features/admin/adminApi"; // সঠিক পাথ দিন
import { toast } from "sonner";
import { BookPlus, User, BookOpen, Loader2 } from "lucide-react";

const CreateIssue = () => {
  const [userId, setUserId] = useState<string>("");
  const [bookId, setBookId] = useState<string>("");

  const [createIssue, { isLoading }] = useCreateIssueMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !bookId) {
      toast.error("User ID এবং Book ID উভয়ই দেওয়া আবশ্যক!");
      return;
    }

    const toastId = toast.loading("বই ইস্যু করা হচ্ছে...");

    try {
      await createIssue({
        user_id: Number(userId),
        book_id: Number(bookId),
      }).unwrap();

      toast.success("বইটি সফলভাবে ইস্যু করা হয়েছে!", { id: toastId });

      // Form reset
      setUserId("");
      setBookId("");
    } catch (error: any) {
      console.error("Create issue error:", error);
      const errorMsg =
        error?.data?.detail ||
        error?.data?.message ||
        "বই ইস্যু করতে সমস্যা হয়েছে!";

      toast.error(errorMsg, { id: toastId });
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-slate-100 font-sans">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
          <BookPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Create Book Issue</h2>
          <p className="text-xs text-slate-400">
            Issue a book to a registered user
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* User ID Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            User ID
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors text-sm"
              required
            />
          </div>
        </div>

        {/* Book ID Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Book ID
          </label>
          <div className="relative">
            <BookOpen className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors text-sm"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Issuing Book...
            </>
          ) : (
            "Create Issue"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateIssue;
