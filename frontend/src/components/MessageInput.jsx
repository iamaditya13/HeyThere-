import React,{ useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile, Paperclip } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border-t border-white/10 p-4 flex-shrink-0">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4 flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-white/20 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
              type="button"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-300 font-medium">
              Image ready to send
            </p>
            <p className="text-xs text-gray-500 mt-1">Click the X to remove</p>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        {/* Main Input Container */}
        <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-3 focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
          <div className="flex items-end gap-3">
            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex-shrink-0 p-2 rounded-xl transition-all hover:bg-white/10 ${
                imagePreview
                  ? "text-purple-400 bg-purple-400/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Text Input */}
            <textarea
              ref={textareaRef}
              className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-sm leading-relaxed min-h-[24px] max-h-[120px] py-1"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyPress={handleKeyPress}
              rows={1}
            />

            {/* Emoji Button */}
            <button
              type="button"
              className="flex-shrink-0 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`
            p-3 rounded-2xl transition-all duration-200 shadow-lg
            ${
              !text.trim() && !imagePreview
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transform hover:scale-105 hover:shadow-xl"
            }
          `}
        >
          <Send className="w-5 h-5" />
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </form>

      {/* Quick Actions / Suggestions (Optional) */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span>Press Enter to send, Shift + Enter for new line</span>
      </div>
    </div>
  );
};

export default MessageInput;
