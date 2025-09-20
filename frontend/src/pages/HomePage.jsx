import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-base-200 pt-16">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-emerald-900/5 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div
        className={`relative z-10 flex items-center justify-center pt-8 px-4 h-full transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl w-full max-w-7xl h-[calc(100vh-4rem)] overflow-hidden transform transition-all duration-700 ease-out">
          {/* Chat Container */}
          <div className="flex h-full">
            {/* Sidebar with modern styling */}
            <div
              className={`w-80 border-r border-white/10 backdrop-blur-xl bg-black/20 transition-all duration-500 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <Sidebar />
            </div>

            {/* Main Chat Area */}
            <div
              className={`flex-1 backdrop-blur-xl bg-black/10 transition-all duration-700 ease-out delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.8s ease-out;
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.6s ease-out;
        }

        .animate-slideInFromRight {
          animation: slideInFromRight 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
