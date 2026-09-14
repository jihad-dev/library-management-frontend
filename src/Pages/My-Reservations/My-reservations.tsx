/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Loader2,
  BookOpen,
  Calendar,
  Clock,
  AlertCircle,
  Tag,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetMyReservationsQuery,
  useCancelReservationMutation,
} from "../../Redux/features/admin/adminApi";

export interface Reservation {
  id: number;
  book_id: number;
  user_id: number;
  status: string;
  reservation_date: string;
}

const MyReservations = () => {
  const {
    data: reservations,
    isLoading,
    isError,
    error,
  } = useGetMyReservationsQuery(undefined);

  // RTK Query Mutation for canceling reservation
  const [cancelReservation, { isLoading: isCanceling }] =
    useCancelReservationMutation();

  // Cancel Handler Function
  const handleCancelReservation = async (reservationId: number) => {
    const toastId = toast.loading("রিজার্ভেশন বাতিল করা হচ্ছে...");

    try {
      await cancelReservation(reservationId).unwrap();
      toast.success("রিজার্ভেশন সফলভাবে বাতিল করা হয়েছে!", { id: toastId });
    } catch (err: any) {
      console.error("Cancel reservation error:", err);
      const errorMsg =
        err?.data?.detail ||
        err?.data?.message ||
        "রিজার্ভেশন বাতিল করতে সমস্যা হয়েছে!";

      toast.error(errorMsg, { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-400 space-y-2">
        <AlertCircle className="w-10 h-10" />
        <p className="text-lg font-semibold">Failed to load reservations</p>
        <p className="text-sm text-slate-400">
          {(error as any)?.data?.detail || "Something went wrong!"}
        </p>
      </div>
    );
  }

  // ✅ ডেটা Array কি না পরীক্ষা করা (Array না হলে খালি Array দিয়ে হ্যান্ডেল করবে)
  const reservationList = Array.isArray(reservations) ? reservations : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-slate-100 mt-12 font-sans">
      <div className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-amber-500" />
          My Reserved Books
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage and track all your active book reservations
        </p>
      </div>

      {reservationList.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-300">
            No Reservations Found
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            You haven't reserved any books yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservationList.map((item: Reservation) => (
            <div
              key={item.id}
              className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300 shadow-xl relative flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border capitalize ${
                      item.status === "pending"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    Reservation #{item.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  Book ID: #{item.book_id}
                </h3>
              </div>

              <div>
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 mt-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      {new Date(item.reservation_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {new Date(item.reservation_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Cancel Reservation Button */}
                <button
                  onClick={() => handleCancelReservation(item.id)}
                  disabled={isCanceling}
                  className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 text-xs font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                  Cancel Reservation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
