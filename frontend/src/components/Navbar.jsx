import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import {
  MessageSquare,
  User,
  Settings,
  LogOut,
  Home,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Chat", href: "/", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-black/20 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group hover:scale-105 transition-transform duration-200"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl opacity-20 blur-sm"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              HeyThere!
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-400 border border-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Desktop User Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={authUser?.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white/20 group-hover:border-purple-400/50 transition-all duration-200"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">
                    {authUser?.fullName}
                  </p>
                  <p className="text-xs text-gray-400">{authUser?.email}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 backdrop-blur-xl bg-black/80 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-slideDown">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-sm font-medium text-white">
                      {authUser?.fullName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {authUser?.email}
                    </p>
                  </div>

                  <div className="p-1">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          {item.name}
                        </Link>
                      );
                    })}

                    <hr className="my-1 border-white/10" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden backdrop-blur-xl bg-black/80 border-t border-white/10 animate-slideDown">
            <div className="p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-400 border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}

              <hr className="my-2 border-white/10" />

              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
