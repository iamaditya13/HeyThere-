import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import useAuthStore from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Safety check - don't render if no selected user
  if (!selectedUser || !selectedUser._id) {
    return null;
  }

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="h-full flex flex-col bg-gray-700 relative">
        <ChatHeader />
        <div className="flex-1 min-h-0 overflow-hidden">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-700">
      <ChatHeader />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.length > 0 ? (
          <div className="p-6 space-y-6">
            {messages.map((message, index) => {
              const isOwn = message.senderId === authUser._id;
              const showAvatar =
                index === 0 ||
                messages[index - 1].senderId !== message.senderId;

              return (
                <div
                  key={message._id}
                  className={`flex items-end gap-3 transition-all duration-300 ease-in-out ${
                    isOwn ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  {showAvatar ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 shadow-sm flex-shrink-0">
                      <img
                        src={
                          isOwn
                            ? authUser.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10"></div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`flex flex-col max-w-[70%] ${
                      isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Time - only show for first message in group */}
                    {showAvatar && (
                      <div
                        className={`text-xs text-gray-400 mb-1 px-1 ${
                          isOwn ? "text-right" : "text-left"
                        }`}
                      >
                        {formatMessageTime(message.createdAt)}
                      </div>
                    )}

                    <div
                      className={`
                        relative p-4 rounded-2xl shadow-sm
                        ${
                          isOwn
                            ? "bg-blue-500 text-white"
                            : "bg-gray-600 text-white"
                        }
                        ${isOwn ? "rounded-br-md" : "rounded-bl-md"}
                      `}
                    >
                      {/* Image Message */}
                      {message.image && (
                        <div className="mb-3 last:mb-0">
                          <img
                            src={message.image}
                            alt="Shared image"
                            className="max-w-[280px] rounded-lg shadow-sm border border-gray-500"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Text Message */}
                      {message.text && (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {message.text}
                        </p>
                      )}

                      {/* Message Status/Time for own messages */}
                      {isOwn && (
                        <div className="flex items-center justify-end mt-2 gap-1">
                          <span className="text-xs text-blue-200 opacity-70">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                          {/* Read status indicator */}
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-blue-200 opacity-60"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state when no messages */
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mb-4 border border-gray-500">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.418 8-9 8a9.013 9.013 0 01-5.314-1.746l-3.657 1.22a.5.5 0 01-.644-.644l1.22-3.657C2.746 14.14 2 13.12 2 12c0-4.418 4.418-8 10-8s10 3.582 10 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No messages yet
            </h3>
            <p className="text-gray-400 text-sm">
              Start the conversation with {selectedUser.fullName}
            </p>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
