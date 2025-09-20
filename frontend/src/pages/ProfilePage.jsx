import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-20">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Profile Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your profile information and preferences
              </p>
            </div>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute -bottom-2 -right-2 
                    bg-blue-500 hover:bg-blue-600
                    p-3 rounded-full cursor-pointer 
                    transition-all duration-300 transform hover:scale-110
                    ${
                      isUpdatingProfile
                        ? "animate-pulse pointer-events-none opacity-50"
                        : ""
                    }
                    shadow-lg border-2 border-white dark:border-gray-800
                  `}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm">
                {isUpdatingProfile
                  ? "Uploading your new profile picture..."
                  : "Click the camera icon to update your profile photo. Supports JPG, PNG, and GIF formats."}
              </p>
            </div>

            {/* Profile Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Full Name
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {authUser?.fullName}
                </p>
              </div>

              {/* Email Address */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Email Address
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {authUser?.email}
                </p>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Account Information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Member Since
                    </span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {authUser?.createdAt
                      ? new Date(authUser.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Account Status
                    </span>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                    Active
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Chats
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Messages Sent
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  Online
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Current Status
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
