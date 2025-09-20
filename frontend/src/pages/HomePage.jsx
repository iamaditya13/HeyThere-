import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-slate-50 overflow-hidden dark:bg-gray-900">
      {/* Main Content Container */}
      <div className="fixed inset-0 top-16">
        <div className="h-full w-full bg-white border border-slate-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          {/* Mobile Layout - Single Panel */}
          <div className="h-full w-full lg:hidden">
            {!selectedUser ? (
              <div className="h-full w-full">
                <Sidebar />
              </div>
            ) : (
              <div className="h-full w-full bg-gray-50 dark:bg-gray-850">
                <ChatContainer />
              </div>
            )}
          </div>

          {/* Desktop Layout - Two Panel */}
          <div className="hidden lg:flex h-full w-full">
            {/* Sidebar - Fixed width */}
            <div className="w-80 h-full flex-shrink-0 overflow-hidden border-r border-gray-200 dark:border-gray-700">
              <Sidebar />
            </div>

            {/* Content Area - Full remaining width */}
            <div className="flex-1 h-full overflow-hidden bg-gray-50 dark:bg-gray-850">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
