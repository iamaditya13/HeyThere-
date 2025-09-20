import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-16 bg-gray-850 relative overflow-hidden">
      <div className="max-w-md text-center space-y-8 relative z-10">
        {/* Icon Display */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gray-700 flex items-center justify-center border border-gray-600 shadow-lg">
              <MessageSquare className="w-12 h-12 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">HeyThere!</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Select a conversation from the sidebar to start chatting with your
            friends and colleagues.
          </p>
        </div>

        {/* Call to Action */}
        <div className="pt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Ready to chat</span>
          </div>
        </div>

        {/* Simple Dots */}
        <div className="flex justify-center space-x-2 pt-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
