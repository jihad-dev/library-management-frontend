import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Building2,
  Users,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  category: "Clients" | "Partners" | "Enterprise";
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Lead",
    company: "Acme Co.",
    category: "Clients",
    rating: 5,
    text: "The quality of products on this site is exceptional. I'm particularly impressed with the fast shipping and excellent customer service. Will definitely shop here again!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Beta Inc.",
    category: "Enterprise",
    rating: 5,
    text: "Found exactly what I was looking for at a great price. The detailed product descriptions and reviews helped me make an informed decision. Very satisfied with my purchase.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Lead Designer",
    company: "Gamma LLC",
    category: "Clients",
    rating: 5,
    text: "The website is so easy to navigate and the checkout process was smooth. My order arrived earlier than expected and was exactly as described. Highly recommend!",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Chief Technology Officer",
    company: "Delta Tech",
    category: "Partners",
    rating: 5,
    text: "Outstanding selection of electronics. The product recommendations were spot-on and helped me find the perfect laptop for my needs. Great experience overall.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Chief Executive Officer",
    company: "Epsilon Group",
    category: "Enterprise",
    rating: 5,
    text: "The customer support team went above and beyond to help me with my purchase. The product quality is fantastic and the prices are very competitive.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
];

const categories = ["All", "Clients", "Enterprise", "Partners"] as const;

const Testimonials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTestimonials = testimonials.filter(
    (item) => activeCategory === "All" || item.category === activeCategory,
  );

  const activeTestimonial =
    filteredTestimonials[currentIndex] || filteredTestimonials[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length,
    );
  };

  return (
    <section className="relative bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Trusted Ratings & Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight"
          >
            Loved by Thousands of <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Read authentic stories from verified users and see how our platform
            transforms workflows every single day.
          </motion.p>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 font-bold scale-105"
                    : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured Testimonial Showcase (Hero Card) */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            {activeTestimonial && (
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl overflow-hidden"
              >
                {/* Decorative Quotes Watermark */}
                <Quote className="absolute -top-4 -right-4 w-40 h-40 text-amber-500/5 -scale-x-100 pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                  {/* Left Column: Avatar & Meta */}
                  <div className="flex flex-col items-center text-center shrink-0 space-y-3">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-tr from-amber-500 via-indigo-500 to-amber-300 shadow-xl overflow-hidden">
                        <img
                          src={activeTestimonial.avatar}
                          alt={activeTestimonial.name}
                          className="w-full h-full object-cover rounded-[14px]"
                        />
                      </div>
                      <span className="absolute -bottom-2 -right-2 bg-emerald-500 border-2 border-slate-950 rounded-full p-1 text-white shadow-md">
                        <BadgeCheck className="w-4 h-4" />
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-lg sm:text-xl">
                        {activeTestimonial.name}
                      </h3>
                      <p className="text-amber-400 text-xs font-semibold">
                        {activeTestimonial.role}
                      </p>
                      <p className="text-slate-500 text-xs flex items-center justify-center gap-1 mt-1">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        {activeTestimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Content */}
                  <div className="flex-1 flex flex-col justify-between space-y-6 text-center md:text-left">
                    <div className="space-y-4">
                      {/* Rating Stars */}
                      <div className="flex items-center justify-center md:justify-start gap-1">
                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-200 text-base sm:text-lg italic leading-relaxed">
                        "{activeTestimonial.text}"
                      </p>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md">
                        Verified {activeTestimonial.category}
                      </span>

                      {/* Carousel Navigation */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrev}
                          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-400 transition-all active:scale-95"
                          aria-label="Previous Testimonial"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-xs text-slate-500 font-mono">
                          {currentIndex + 1} / {filteredTestimonials.length}
                        </span>
                        <button
                          onClick={handleNext}
                          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-400 transition-all active:scale-95"
                          aria-label="Next Testimonial"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Secondary Grid (Overview Cards for Multi-item view) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {testimonials.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/40 border border-slate-800/60 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-900/80 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/50 mt-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats & Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-slate-800/80 pt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
        >
          <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/40">
            <ThumbsUp className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h5 className="text-2xl font-black text-white">99%</h5>
            <p className="text-slate-400 text-xs mt-1">Customer Satisfaction</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/40">
            <Users className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <h5 className="text-2xl font-black text-white">10K+</h5>
            <p className="text-slate-400 text-xs mt-1">Active Users</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/40">
            <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h5 className="text-2xl font-black text-white">4.9 / 5</h5>
            <p className="text-slate-400 text-xs mt-1">Average Rating</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/40">
            <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <h5 className="text-2xl font-black text-white">24/7</h5>
            <p className="text-slate-400 text-xs mt-1">Dedicated Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
