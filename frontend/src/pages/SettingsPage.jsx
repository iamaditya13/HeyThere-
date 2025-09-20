import React from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette, Eye, MessageSquare } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-emerald-900/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 pt-20 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Settings
            </h1>
            <p className="text-gray-400 text-lg">
              Customize your chat experience
            </p>
          </div>

          {/* Theme Section */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Theme Selection
                </h2>
                <p className="text-gray-400">
                  Choose a theme that suits your style
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300
                    backdrop-blur-xl border transform hover:scale-105 hover:shadow-lg
                    ${
                      theme === t
                        ? "bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border-purple-500/50 shadow-lg scale-105"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div
                    className="relative w-12 h-8 rounded-lg overflow-hidden shadow-md"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary opacity-90"></div>
                      <div className="rounded bg-secondary opacity-90"></div>
                      <div className="rounded bg-accent opacity-90"></div>
                      <div className="rounded bg-neutral opacity-90"></div>
                    </div>
                    {theme === t && (
                      <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full shadow-md"></div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors capitalize">
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Live Preview
                </h3>
                <p className="text-gray-400">
                  See how your selected theme looks
                </p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <div className="p-6">
                <div className="max-w-2xl mx-auto">
                  {/* Mock Chat UI */}
                  <div className="backdrop-blur-xl bg-white/10 rounded-xl shadow-lg overflow-hidden border border-white/20">
                    {/* Chat Header */}
                    <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-purple-600/10 to-indigo-600/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg">
                          J
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">John Doe</h3>
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            Online
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-6 space-y-4 min-h-[250px] max-h-[250px] overflow-y-auto">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isSent ? "justify-end" : "justify-start"
                          } animate-fadeIn`}
                        >
                          <div
                            className={`
                              max-w-[80%] rounded-2xl p-4 shadow-lg
                              ${
                                message.isSent
                                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                                  : "backdrop-blur-xl bg-white/10 text-white border border-white/20"
                              }
                            `}
                          >
                            <p className="text-sm leading-relaxed">
                              {message.content}
                            </p>
                            <p
                              className={`
                                text-xs mt-2 opacity-70
                                ${
                                  message.isSent
                                    ? "text-purple-100"
                                    : "text-gray-400"
                                }
                              `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Typing Indicator */}
                      <div className="flex justify-start">
                        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                            <span className="text-xs text-gray-400">
                              John is typing...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-6 border-t border-white/20 bg-gradient-to-r from-purple-600/5 to-indigo-600/5">
                      <div className="flex gap-3 items-end">
                        <div className="flex-1 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-3">
                          <input
                            type="text"
                            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                            placeholder="Type your message..."
                            value="This is a preview message"
                            readOnly
                          />
                        </div>
                        <button className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">
                          <Send className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chat Settings */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Chat Preferences
                </h3>
              </div>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-center justify-between py-2">
                  <span>Message Sound</span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Auto-scroll</span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Show Timestamps</span>
                  <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-all"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Privacy & Security
                </h3>
              </div>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-center justify-between py-2">
                  <span>Read Receipts</span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Online Status</span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Profile Picture Visibility</span>
                  <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-all"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
