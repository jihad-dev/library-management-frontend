import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Library,
  BookmarkCheck,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  Clock,
  Globe2,
  Award,
  Search,
} from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Container with balanced padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
        {/* ----------------- Hero Section ----------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center space-y-6 max-w-4xl mx-auto pt-8 sm:pt-12"
        >
          {/* Background Gradient Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-4 h-4" /> Empowering Readers Worldwide
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15]">
            Gateway to Knowledge & <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Digital Learning
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg sm:leading-relaxed max-w-2xl mx-auto font-normal">
            We bridge the gap between avid readers and vast literary resources.
            Discover thousands of physical and digital books seamlessly.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <motion.a
              href="#story"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2"
            >
              Our Heritage <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* ----------------- Animated Stats Strip ----------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl"
        >
          {[
            { label: "Physical Books", value: "25,000+", icon: BookOpen },
            { label: "Active Members", value: "12,000+", icon: Library },
            { label: "Daily Loans", value: "1,500+", icon: BookmarkCheck },
            { label: "Digital E-Books", value: "8,000+", icon: Globe2 },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-3 sm:p-4 space-y-2"
            >
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-slate-400 text-xs sm:text-sm font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ----------------- Story & Vision Section ----------------- */}
        <div
          id="story"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center scroll-mt-28"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">
              Our Heritage
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Reinventing the Modern Library Experience
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Founded with a mission to foster lifelong learning, LibraryHub
              began as a community reading room. Today, it stands as an advanced
              library management system supporting automated reservations,
              real-time availability tracking, and digital cataloging.
            </p>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Whether you are an academic researcher, student, or casual reader,
              our platform ensures seamless access to literature with smart
              reservation controls and personalized borrowing logs.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Top Community Library
                </h4>
                <p className="text-xs text-slate-400">Excellence Award 2026</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent rounded-3xl blur-2xl -z-10" />
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80"
                alt="Library Interior"
                className="rounded-2xl w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* ----------------- Core Features Grid ----------------- */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Readers Choose Us
            </h2>
            <p className="text-slate-400 text-base">
              Engineered to deliver an unmatched reading and borrowing
              experience.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 hover:border-indigo-500/40 transition-all shadow-xl hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Smart Catalog Search
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Filter through thousands of titles by category, author, or ISBN
                in milliseconds with real-time stock availability.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 hover:border-purple-500/40 transition-all shadow-xl hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                <BookmarkCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Instant Book Reservation
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Reserve desired titles online with one click and collect them
                hassle-free at your convenience.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 hover:border-pink-500/40 transition-all shadow-xl hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Extended Loan Tracker
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Track your active issues, reservation status, and return
                deadlines through a personal member dashboard.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ----------------- Contact Banner ----------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-14 overflow-hidden shadow-2xl backdrop-blur-xl text-center space-y-10"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Get in Touch with Our Librarians
            </h2>
            <p className="text-slate-400 text-base">
              Need assistance finding a book, requesting new acquisitions, or
              managing your membership account?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center justify-center gap-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-slate-300 hover:border-slate-700 transition-colors">
              <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="text-sm font-semibold">+1 (555) 839-2001</span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-slate-300 hover:border-slate-700 transition-colors">
              <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="text-sm font-semibold">
                support@libraryhub.com
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-slate-300 hover:border-slate-700 transition-colors">
              <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="text-sm font-semibold">
                450 Knowledge Blvd, NY
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
