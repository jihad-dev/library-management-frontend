/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logout } from "../../Redux/features/auth/authSlice";

import {
  User,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  BookOpen,
  Receipt,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAdminOrSuperAdmin =
    user?.role?.toLowerCase() === "admin" ||
    user?.role?.toLowerCase() === "superadmin";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-xl py-3 border-b border-slate-800"
          : "bg-slate-900/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-indigo-600 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-indigo-600/20">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Library<span className="text-indigo-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-800/50 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-md">
            {[
              { path: "/", label: "Home" },
              { path: "/books", label: "Catalog" },
              { path: "/about", label: "About Us" },
              { path: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Icons & User Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAdminOrSuperAdmin && (
              <Link
                to="/dashboard/admin-home"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-indigo-400 border border-slate-700/50 transition-all duration-200 hover:scale-105"
                title="Admin Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>
            )}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                    {user?.name || "Account"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-700/50">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-white truncate">
                        {user?.email || "User"}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-700/50 hover:text-indigo-400 transition-colors"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>

                    <Link
                      to="/my-reservations"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-700/50 hover:text-indigo-400 transition-colors"
                    >
                      <Receipt className="w-4 h-4" /> My Reservations
                    </Link>

                    {isAdminOrSuperAdmin && (
                      <Link
                        to="/dashboard/admin-home"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-indigo-400 hover:bg-slate-700/50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-slate-700/50 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700/50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 bg-slate-800/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col space-y-1">
              {[
                { path: "/", label: "Home" },
                { path: "/books", label: "Catalog" },
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {user && (
                <>
                  <div className="border-t border-slate-700/50 my-2 pt-2">
                    <Link
                      to="/my-reservations"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50 flex items-center gap-2"
                    >
                      <Receipt className="w-4 h-4" /> My Reservations
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    {isAdminOrSuperAdmin && (
                      <Link
                        to="/dashboard/admin-home"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-400 hover:bg-slate-700/50 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
