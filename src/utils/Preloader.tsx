import React from "react";
import { BookOpen } from "lucide-react";

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-slate-100">
      {/* Visual Animation Container */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Pulsing Glow */}
        <div className="absolute w-44 h-44 rounded-full bg-indigo-500/15 animate-ping duration-1000" />

        {/* Spinning Outer Ring */}
        <div className="w-32 h-32 rounded-full border-4 border-slate-800 border-t-indigo-500 border-r-cyan-400 animate-spin" />

        {/* Central Glowing Badge with Animated Book Icon */}
        <div className="absolute flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-2xl shadow-2xl shadow-indigo-500/40 transform rotate-3">
          <BookOpen className="w-10 h-10 text-white animate-bounce" />
        </div>
      </div>

      {/* Brand & Loading Text */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent uppercase">
          Library Central
        </h1>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium text-slate-400">
            Fetching shelf data, please wait
          </span>
          <span className="flex items-center gap-1.5 ml-1">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
