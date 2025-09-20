const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {skeletonMessages.map((_, idx) => {
        const isOwn = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`flex items-end gap-3 ${
              isOwn ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar Skeleton */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-600/50 animate-pulse"></div>
            </div>

            {/* Message Content */}
            <div
              className={`flex flex-col max-w-[70%] ${
                isOwn ? "items-end" : "items-start"
              }`}
            >
              {/* Time Skeleton */}
              <div
                className={`mb-1 px-1 ${isOwn ? "text-right" : "text-left"}`}
              >
                <div className="h-3 w-16 bg-gradient-to-r from-gray-700/30 to-gray-600/30 rounded animate-pulse"></div>
              </div>

              {/* Message Bubble Skeleton */}
              <div
                className={`
                  relative p-4 rounded-2xl border backdrop-blur-sm
                  ${
                    isOwn
                      ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-purple-500/30"
                      : "bg-white/5 border-white/20"
                  }
                  ${isOwn ? "rounded-br-md" : "rounded-bl-md"}
                `}
              >
                {/* Text Lines */}
                <div className="space-y-2">
                  <div
                    className={`h-4 rounded animate-pulse ${
                      idx % 3 === 0 ? "w-32" : idx % 3 === 1 ? "w-48" : "w-40"
                    } bg-gradient-to-r ${
                      isOwn
                        ? "from-purple-300/30 to-indigo-300/30"
                        : "from-gray-300/30 to-gray-400/30"
                    }`}
                  ></div>

                  {idx % 4 !== 0 && (
                    <div
                      className={`h-4 rounded animate-pulse ${
                        idx % 3 === 0 ? "w-24" : "w-36"
                      } bg-gradient-to-r ${
                        isOwn
                          ? "from-purple-300/20 to-indigo-300/20"
                          : "from-gray-300/20 to-gray-400/20"
                      }`}
                    ></div>
                  )}
                </div>

                {/* Status indicator for own messages */}
                {isOwn && (
                  <div className="flex items-center justify-end mt-3 gap-1">
                    <div className="h-2 w-8 bg-purple-200/20 rounded animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-purple-200/30 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Typing Indicator Skeleton */}
      <div className="flex items-end gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700/50 to-gray-600/50 animate-pulse border-2 border-white/20"></div>
        <div className="bg-white/5 border border-white/20 rounded-2xl rounded-bl-md p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400/50 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400/50 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400/50 rounded-full animate-bounce delay-200"></div>
            </div>
            <div className="h-3 w-20 bg-gray-400/30 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
