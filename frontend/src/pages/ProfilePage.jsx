import React,{ useState } from "react";
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
    <div className="min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-emerald-900/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 pt-20">
        <div className="max-w-4xl mx-auto p-6">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-8 space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                Profile Settings
              </h1>
              <p className="text-gray-400">
                Manage your profile information and preferences
              </p>
            </div>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="relative">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-20 blur-md"></div>
                </div>
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute -bottom-2 -right-2 
                    bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                    p-3 rounded-full cursor-pointer 
                    transition-all duration-300 transform hover:scale-110
                    ${
                      isUpdatingProfile
                        ? "animate-pulse pointer-events-none opacity-50"
                        : ""
                    }
                    shadow-lg border-2 border-white/20
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
              <p className="text-sm text-gray-400 text-center max-w-sm">
                {isUpdatingProfile
                  ? "Uploading your new profile picture..."
                  : "Click the camera icon to update your profile photo. Supports JPG, PNG, and GIF formats."}
              </p>
            </div>

            {/* Profile Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <User className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Full Name
                  </h3>
                </div>
                <p className="text-gray-300 text-lg">{authUser?.fullName}</p>
              </div>

              {/* Email Address */}
              <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Mail className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Email Address
                  </h3>
                </div>
                <p className="text-gray-300 text-lg">{authUser?.email}</p>
              </div>
            </div>

            {/* Account Information */}
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Account Information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300 font-medium">
                      Member Since
                    </span>
                  </div>
                  <span className="text-white font-semibold">
                    {authUser?.createdAt
                      ? new Date(authUser.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 font-medium">
                      Account Status
                    </span>
                  </div>
                  <span className="text-emerald-400 font-semibold flex items-center gap-2">
                    Active
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-4 rounded-xl border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-purple-400">0</div>
                <div className="text-sm text-gray-400">Total Chats</div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 p-4 rounded-xl border border-indigo-500/20 text-center">
                <div className="text-2xl font-bold text-indigo-400">0</div>
                <div className="text-sm text-gray-400">Messages Sent</div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-purple-500/10 p-4 rounded-xl border border-emerald-500/20 text-center">
                <div className="text-2xl font-bold text-emerald-400">
                  Online
                </div>
                <div className="text-sm text-gray-400">Current Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
