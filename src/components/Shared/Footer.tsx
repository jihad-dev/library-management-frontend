import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-slate-950 text-slate-200 overflow-hidden pt-16 pb-8 border-t border-slate-800">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16"
        >
          {/* Column 1: Library Brand & Bio */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-xl text-slate-950 shadow-lg shadow-indigo-500/20">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Library<span className="text-indigo-400">Hub</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering readers and researchers with seamless access to
              millions of physical and digital resources. Discover knowledge
              without boundaries.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800 transition-all shadow-sm"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2: Library Catalog & Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> Catalog &
              Portal
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Search Book Catalog", href: "/catalog" },
                { name: "E-Books & Audiobooks", href: "/digital" },
                { name: "Research Databases", href: "/research" },
                { name: "Reserve a Study Room", href: "/rooms" },
                { name: "Borrowing Rules & Passes", href: "/rules" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact & Hours */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />{" "}
              Information Desk
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                <span>Central Campus Library, 4th Floor, Knowledge Block</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+1 (800) 555-BOOK</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>helpdesk@bookvault.edu</span>
              </li>
              <li className="flex items-start gap-3 pt-1 border-t border-slate-800/80">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Reading Room Hours:</p>
                  <p className="text-xs text-slate-400">
                    Mon – Sat: 08:00 AM – 10:00 PM
                  </p>
                  <p className="text-xs text-slate-500">
                    Sun: 10:00 AM – 06:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Newsletter & Library Card Updates */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 p-5 rounded-2xl border border-slate-800/80 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Stay Informed
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                New Arrivals & Research Digest
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Subscribe to receive notifications about newly cataloged books,
                journal subscriptions, and events.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter library ID or email"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-slate-950 text-xs font-extrabold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500"
        >
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400 inline" />
            &copy; {new Date().getFullYear()} BookVault Library Management
            System. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Borrowing Terms
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Archival Regulations
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
