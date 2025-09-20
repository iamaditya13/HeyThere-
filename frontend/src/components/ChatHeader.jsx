import React from "react";
import { X, Phone, Video, MoreVertical, Info } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser,  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-4">
          {/* Avatar with online status */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg"
            />
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black shadow-lg">
                <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* User details */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-white text-lg">
              {selectedUser.fullName}
            </h3>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-emerald-500 animate-pulse" : "bg-gray-500"
                }`}
              ></div>
              <p
                className={`text-sm ${
                  isOnline ? "text-emerald-400" : "text-gray-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
              {isOnline && (
                <span className="text-xs text-gray-500">• Active now</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Call buttons */}
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors group">
            <Phone className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors group">
            <Video className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors group">
            <Info className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          {/* More options */}
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors group">
            <MoreVertical className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>

          {/* Close chat button */}
          <div className="w-px h-6 bg-white/20 mx-2"></div>
          <button
            onClick={() => setSelectedUser(null)}
            className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;