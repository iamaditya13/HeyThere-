import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesOnlineFilter = showOnlineOnly
      ? onlineUsers.includes(user._id)
      : true;
    return matchesSearch && matchesOnlineFilter;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full flex flex-col backdrop-blur-xl bg-black/20 border-r border-white/10">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-white text-lg">Contacts</span>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
          />
        </div>

        {/* Online Filter Toggle */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  showOnlineOnly
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                    : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-200 ease-in-out ${
                    showOnlineOnly ? "translate-x-5" : "translate-x-0.5"
                  } mt-0.5`}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Show online only
            </span>
          </label>
          <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto py-2 space-y-1 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-4 mx-2 rounded-xl flex items-center gap-3
              transition-all duration-200 hover:bg-white/10 group relative
              ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/50 shadow-lg"
                  : "hover:shadow-md"
              }
            `}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="w-12 h-12 object-cover rounded-full border-2 border-white/20 group-hover:border-purple-400/50 transition-colors"
              />
              {onlineUsers.includes(user._id) && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black shadow-lg">
                  <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* User Info - Always visible */}
            <div className="flex-1 text-left min-w-0 space-y-1">
              <div className="font-medium text-white truncate group-hover:text-purple-200 transition-colors">
                {user.fullName}
              </div>
              <div
                className={`text-sm transition-colors ${
                  onlineUsers.includes(user._id)
                    ? "text-emerald-400"
                    : "text-gray-500"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedUser?._id === user._id && (
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
            )}
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-500 text-sm">
              {searchTerm
                ? "No contacts match your search"
                : showOnlineOnly
                ? "No online users found"
                : "No contacts available"}
            </p>
          </div>
        )}
      </div>

      {/* Online Status Footer */}
      <div className="p-4 border-t border-white/10 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>You're online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
