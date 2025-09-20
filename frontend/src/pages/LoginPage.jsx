import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-emerald-900/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 w-full max-w-md">
          <div className="w-full space-y-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-2xl">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl opacity-20 blur-md"></div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className="text-gray-400">
                    Sign in to continue your conversations
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-purple-400 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
