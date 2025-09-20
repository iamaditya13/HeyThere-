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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-20 container mx-auto px-4 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Customize your chat experience
            </p>
          </div>

          {/* Theme Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Theme Selection
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a theme that suits your style
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200
                    border hover:scale-105 hover:shadow-sm
                    ${
                      theme === t
                        ? "bg-blue-50 border-blue-200 shadow-sm scale-105 dark:bg-blue-900/20 dark:border-blue-700"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div
                    className="relative w-12 h-8 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary opacity-90"></div>
                      <div className="rounded bg-secondary opacity-90"></div>
                      <div className="rounded bg-accent opacity-90"></div>
                      <div className="rounded bg-neutral opacity-90"></div>
                    </div>
                    {theme === t && (
                      <div className="absolute inset-0 bg-white/30 flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full shadow-sm"></div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors capitalize">
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Live Preview
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  See how your selected theme looks
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
              <div className="p-6">
                <div className="max-w-2xl mx-auto">
                  {/* Mock Chat UI */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-600">
                    {/* Chat Header */}
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shadow-sm">
                          J
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            John Doe
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
                          }`}
                        >
                          <div
                            className={`
                              max-w-[80%] rounded-2xl p-4 shadow-sm
                              ${
                                message.isSent
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-gray-900 border border-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-500"
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
                                    ? "text-blue-100"
                                    : "text-gray-500 dark:text-gray-400"
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
                        <div className="bg-gray-100 dark:bg-gray-600 rounded-2xl p-4 border border-gray-200 dark:border-gray-500">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              John is typing...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                      <div className="flex gap-3 items-end">
                        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 p-3">
                          <input
                            type="text"
                            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm"
                            placeholder="Type your message..."
                            value="This is a preview message"
                            readOnly
                          />
                        </div>
                        <button className="p-3 bg-blue-500 rounded-2xl shadow-sm hover:bg-blue-600 transition-colors duration-200">
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Chat Preferences
                </h3>
              </div>
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-between py-2">
                  <span>Message Sound</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Auto-scroll</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Show Timestamps</span>
                  <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-all shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Privacy & Security
                </h3>
              </div>
              <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-between py-2">
                  <span>Read Receipts</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Online Status</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all shadow-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Profile Picture Visibility</span>
                  <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-all shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
