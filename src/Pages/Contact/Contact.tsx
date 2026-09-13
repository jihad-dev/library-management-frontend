import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Building2,
  BookMarked,
} from "lucide-react";

type LibraryInquiryType = "general" | "reservation" | "membership" | "research";

interface InquiryTab {
  id: LibraryInquiryType;
  label: string;
}

const INQUIRY_TABS: InquiryTab[] = [
  { id: "general", label: "General Inquiry" },
  { id: "reservation", label: "Book Reservation" },
  { id: "membership", label: "Membership Card" },
  { id: "research", label: "Research Help" },
];

const LibraryContact: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<LibraryInquiryType>("general");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Background Decorator Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="inline-flex mt-8 items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-xs font-semibold text-indigo-400 tracking-wide uppercase shadow-md shadow-indigo-500/5">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Central Library Desk</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            How Can We Assistance Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500">
              Learning Journey?
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have questions about book availability, digital archives, or library
            memberships? Get in touch with our librarian team.
          </p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl"
          >
            {/* Inquiry Selector */}
            <div className="mb-6 flex flex-wrap gap-2 p-1.5 bg-slate-950/80 border border-slate-800 rounded-2xl">
              {INQUIRY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setInquiryType(tab.id);
                    setSubmitted(false);
                  }}
                  className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-semibold rounded-xl transition-all duration-200 ${
                    inquiryType === tab.id
                      ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto border border-indigo-500/30">
                  <BookMarked className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Inquiry Received!
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out to the library desk. Our team will
                  process your request within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Contact Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@university.edu"
                      className="w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                {/* Conditional Dynamic Inputs */}
                {inquiryType === "reservation" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Book Title / ISBN
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Clean Code (978-0132350884)"
                        className="w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Member ID (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LIB-9842"
                        className="w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>
                )}

                {inquiryType === "membership" && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Membership Status
                    </label>
                    <select className="w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition">
                      <option value="new">Applying for New Membership</option>
                      <option value="renew">
                        Renewing Existing Membership
                      </option>
                      <option value="lost">
                        Lost Library Card Replacement
                      </option>
                    </select>
                  </div>
                )}

                {inquiryType === "general" && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                    />
                  </div>
                )}

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Detailed Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide additional details regarding your request..."
                    className="w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition duration-200 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Library Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Card */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4 backdrop-blur-lg">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                Library Helpdesk
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 mt-1 shrink-0" />
                  <span>
                    Central Library Building, 2nd Floor <br />
                    University Campus, Main Academic Block
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                  <a
                    href="tel:+18005550199"
                    className="hover:text-indigo-400 transition"
                  >
                    +1 (800) 555-0199 (Ext. 402)
                  </a>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <a
                    href="mailto:support@library-system.org"
                    className="hover:text-indigo-400 transition"
                  >
                    support@library-system.org
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-900 border border-indigo-500/20 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 text-indigo-400">
                <Clock className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">
                  Opening & Borrowing Hours
                </h3>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex justify-between text-slate-300 border-b border-slate-800 pb-2">
                  <span>Mon – Fri (Main Hall)</span>
                  <span className="font-semibold text-white">
                    08:00 AM – 09:00 PM
                  </span>
                </li>
                <li className="flex justify-between text-slate-300 border-b border-slate-800 pb-2">
                  <span>Saturday (Reference Desk)</span>
                  <span className="font-semibold text-indigo-400">
                    10:00 AM – 06:00 PM
                  </span>
                </li>
                <li className="flex justify-between text-slate-400">
                  <span>Sunday & Public Holidays</span>
                  <span className="font-semibold text-slate-300">
                    Closed (Digital Portal 24/7)
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LibraryContact;
