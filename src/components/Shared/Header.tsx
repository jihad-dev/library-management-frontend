/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAdminOrSuperAdmin =
    user?.role?.toLowerCase() === "librarian" ||
    user?.role?.toLowerCase() === "superadmin";

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-books", label: "Catalog" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 py-3 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-indigo-600 text-white transition-transform duration-300 group-hover:scale-105 shadow-md shadow-indigo-600/30">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Library<span className="text-indigo-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 shadow-inner">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Icons & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAdminOrSuperAdmin && (
              <Link
                to="/dashboard/admin-home"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800 transition-all duration-200 hover:scale-105"
                title="Admin Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>
            )}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
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

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-xs font-bold text-slate-200 truncate mt-0.5">
                        {user?.email || "User"}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition-colors"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>

                    <Link
                      to="/my-reservations"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition-colors"
                    >
                      <Receipt className="w-4 h-4" /> My Reservations
                    </Link>

                    {isAdminOrSuperAdmin && (
                      <Link
                        to="/dashboard/admin-home"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-indigo-400 hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-slate-800 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
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
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-indigo-600/30 hover:scale-105 active:scale-95"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-900 text-slate-200 hover:text-white border border-slate-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {user && (
                <>
                  <div className="border-t border-slate-800 my-2 pt-2">
                    <Link
                      to="/my-reservations"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-indigo-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Receipt className="w-4 h-4" /> My Reservations
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-indigo-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    {isAdminOrSuperAdmin && (
                      <Link
                        to="/dashboard/admin-home"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-400 hover:bg-slate-800 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors cursor-pointer"
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
