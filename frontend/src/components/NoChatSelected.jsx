import React from "react";
import { MessageSquare, Users, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 backdrop-blur-xl bg-black/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-md text-center space-y-8 relative z-10">
        {/* Icon Display */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-xl">
              <MessageSquare className="w-12 h-12 text-purple-400" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl opacity-50 blur-md"></div>

            {/* Floating accent icons */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to HeyThere!
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Select a conversation from the sidebar to start chatting with your
            friends and colleagues.
          </p>
        </div>

        {/* Call to Action */}
        <div className="pt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Ready to chat</span>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 pt-6">
          <div className="w-2 h-2 bg-purple-500/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-indigo-500/60 rounded-full animate-pulse delay-300"></div>
          <div className="w-2 h-2 bg-emerald-500/60 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
