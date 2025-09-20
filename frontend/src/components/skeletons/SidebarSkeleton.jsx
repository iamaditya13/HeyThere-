import React from "react";
import { Users, Search } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full flex flex-col backdrop-blur-xl bg-black/20 border-r border-white/10">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-xl animate-pulse">
            <Users className="w-5 h-5 text-purple-400/50" />
          </div>
          <div className="font-semibold text-white/50 text-lg hidden lg:block">
            <div className="h-5 w-20 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="relative mb-4 hidden lg:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-500/50" />
          </div>
          <div className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            <div className="h-4 bg-gradient-to-r from-gray-600/30 to-gray-500/30 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Toggle Skeleton */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-6 bg-gray-600/50 rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-gradient-to-r from-gray-600/30 to-gray-500/30 rounded animate-pulse"></div>
          </div>
          <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Contacts List Skeleton */}
      <div className="flex-1 overflow-y-auto py-2 space-y-1">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full p-4 mx-2 rounded-xl flex items-center gap-3 animate-pulse"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Avatar Skeleton */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700/50 to-gray-600/50 rounded-full border-2 border-white/20"></div>
              {/* Online indicator skeleton */}
              {idx % 3 === 0 && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600/50 rounded-full border-2 border-black"></div>
              )}
            </div>

            {/* User Info Skeleton - Desktop */}
            <div className="hidden lg:block flex-1 min-w-0 space-y-2">
              <div
                className={`h-4 bg-gradient-to-r from-gray-600/40 to-gray-500/40 rounded animate-pulse ${
                  idx % 3 === 0 ? "w-28" : idx % 3 === 1 ? "w-32" : "w-24"
                }`}
              ></div>
              <div className="h-3 w-16 bg-gradient-to-r from-gray-700/30 to-gray-600/30 rounded animate-pulse"></div>
            </div>

            {/* Selection Indicator Skeleton */}
            {idx === 0 && (
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500/30 to-indigo-500/30 rounded-full hidden lg:block animate-pulse"></div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="p-4 border-t border-white/10 bg-gradient-to-r from-purple-900/10 to-indigo-900/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-pulse"></div>
          <div className="h-3 w-20 bg-gradient-to-r from-gray-600/30 to-gray-500/30 rounded animate-pulse hidden lg:block"></div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
