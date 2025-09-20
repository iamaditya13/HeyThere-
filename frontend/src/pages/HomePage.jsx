import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-[#0f0f0f] overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-emerald-900/5 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content - Fixed positioning to avoid scrolling */}
      <div className="absolute top-16 left-0 right-0 bottom-0 z-10 overflow-hidden">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl h-full w-full flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r border-white/10 backdrop-blur-xl bg-black/20 flex-shrink-0 h-full overflow-hidden">
            <Sidebar />
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 backdrop-blur-xl bg-black/10 h-full overflow-hidden min-w-0">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
