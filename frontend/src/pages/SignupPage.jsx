import React,{ useState } from "react";
import useAuthStore from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-emerald-900/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full max-w-md transform transition-all duration-700 ease-out animate-slideUp">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl opacity-20 blur-md"></div>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-gray-400">
                  Get started with your free account
                </p>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:bg-white/10"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:bg-white/10"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-200" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:bg-white/10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-purple-400 transition-colors duration-200"
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;
