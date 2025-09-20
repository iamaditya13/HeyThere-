import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";

import { Loader } from "lucide-react";
import useAuthStore from "./store/useAuthStore";

const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex justify-center items-center">
        <div className="text-center space-y-6 animate-bounceIn">
          <div className="relative">
            <Loader className="w-16 h-16 animate-spin text-purple-500 mx-auto" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              HeyThere!
            </p>
            <p className="text-gray-400">Loading your experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] overflow-x-hidden">
      {/* Enhanced Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 15, 15, 0.9)',
            backdropFilter: 'blur(20px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              border: '1px solid rgba(16, 185, 129, 0.3)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              border: '1px solid rgba(239, 68, 68, 0.3)',
            },
          },
        }}
      />

      {/* Conditional Navbar with Animation */}
      {authUser && (
        <div className="animate-slideDownFade">
          <Navbar />
        </div>
      )}

      {/* Routes with Page Transitions */}
      <Routes>
        {/* Authentication Routes */}
        <Route
          path="/login"
          element={
            !authUser ? (
              <PageTransition>
                <LoginPage />
              </PageTransition>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !authUser ? (
              <PageTransition>
                <SignupPage />
              </PageTransition>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/"
          element={
            authUser ? (
              <PageTransition>
                <HomePage />
              </PageTransition>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            authUser ? (
              <PageTransition>
                <ProfilePage />
              </PageTransition>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            authUser ? (
              <PageTransition>
                <SettingsPage />
              </PageTransition>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

     
        <Route
          path="*"
          element={<Navigate to={authUser ? "/" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
};

export default App;