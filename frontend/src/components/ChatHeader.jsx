import React from "react";
import { X, Phone, Video, MoreVertical, Info, ArrowLeft } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Add null/undefined checks
  if (!selectedUser) {
    return null; // Don't render anything if no user is selected
  }

  const isOnline = onlineUsers.includes(selectedUser._id);

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="bg-gray-800 border-b border-gray-600 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* User Info with Back Button */}
        <div className="flex items-center gap-4">
          {/* Back Button for Small/Medium Screens */}
          <button
            onClick={handleBackClick}
            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-all duration-200 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar with online status */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName || "User"}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 shadow-sm"
            />
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 shadow-sm">
                <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* User details */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-white text-lg">
              {selectedUser.fullName || "Unknown User"}
            </h3>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500"
                }`}
              ></div>
              <p
                className={`text-sm ${
                  isOnline ? "text-green-400" : "text-gray-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
              {isOnline && (
                <span className="text-xs text-gray-400 hidden sm:inline">
                  • Active now
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Call buttons - Hide on small screens */}
          <button className="hidden sm:block p-2 hover:bg-gray-700 rounded-lg transition-colors group">
            <Phone className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          <button className="hidden sm:block p-2 hover:bg-gray-700 rounded-lg transition-colors group">
            <Video className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors group">
            <Info className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          {/* More options */}
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors group">
            <MoreVertical className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          {/* Close chat button - Only visible on desktop */}
          <div className="w-px h-6 bg-gray-600 mx-2 hidden lg:block"></div>
          <button
            onClick={() => setSelectedUser(null)}
            className="hidden lg:block p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
