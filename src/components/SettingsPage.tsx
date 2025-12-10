import React, { useState } from "react";
import { User, Shield, X } from "lucide-react";
import type { AuthUser } from "../lib/auth";
import { changePassword } from "../lib/auth";

interface SettingsPageProps {
  user: AuthUser | null;
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onBack }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await changePassword(currentPassword, newPassword);

      if (result.success) {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setShowPasswordModal(false);
          setPasswordSuccess(false);
        }, 2000);
      } else {
        setPasswordError(result.error || "Failed to change password");
      }
    } catch (error) {
      setPasswordError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Page Content - with top padding for fixed nav */}
      <div className="pt-20 md:pl-80 md:pr-80 md:ml-80 md:mr-80">
        {/* Header */}
        <div className="bg-black pt-8 pb-8">
          <div className="max-w-sm mx-auto px-4 md:px-6">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-400 mb-6 text-sm flex items-center gap-2 transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-4xl font-light text-white mb-2">Settings</h1>
            <p className="text-sm text-gray-500 font-light">
              Manage your account preferences
            </p>
          </div>
        </div>

        {/* Settings Content */}
        <div className="max-w-sm mx-auto px-4 md:px-6 pb-12 space-y-6">
          {/* Account Information */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-gray-600" />
              <h2 className="text-sm font-medium text-gray-400">
                Account Information
              </h2>
            </div>
            <div className="bg-black border border-gray-900 rounded-md p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Email Address
                  </label>
                  <p className="text-sm text-white">{user?.email}</p>
                </div>
                <div className="border-t border-gray-900 pt-3">
                  <label className="block text-xs text-gray-600 mb-1">
                    Account Type
                  </label>
                  <p className="text-sm text-white capitalize">{user?.type}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-gray-600" />
              <h2 className="text-sm font-medium text-gray-400">
                Privacy & Security
              </h2>
            </div>
            <div className="bg-black border border-gray-900 rounded-md p-4 space-y-2">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full text-left py-2.5 px-3 bg-black hover:bg-gray-950 rounded-md transition-colors border border-gray-900 hover:border-gray-800"
              >
                <p className="text-white text-sm">Change Password</p>
                <p className="text-gray-600 text-xs mt-0.5">
                  Update your password regularly
                </p>
              </button>
            </div>
          </div>

          {/* Appearance */}
          {/* <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-4 w-4 text-gray-600" />
              <h2 className="text-sm font-medium text-gray-400">Appearance</h2>
            </div>
            <div className="bg-black border border-gray-900 rounded-md p-4">
              <p className="text-white text-sm mb-2">Theme</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-3 bg-black border border-[#D7B387] rounded-md text-white text-sm hover:bg-gray-950 transition-colors">
                  Dark
                </button>
                <button className="flex-1 py-2 px-3 bg-black border border-gray-900 hover:border-gray-800 rounded-md text-gray-500 text-sm hover:bg-gray-950 transition-colors">
                  Light
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 md:pl-80 md:pr-80 md:ml-80 md:mr-80 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
          <div className="bg-black border border-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-light text-white">Change Password</h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError("");
                  setPasswordSuccess(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="text-gray-500 hover:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D7B387]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D7B387]"
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Minimum 6 characters
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D7B387]"
                  required
                  minLength={6}
                />
              </div>

              {passwordError && (
                <div className="bg-red-950 border border-red-800 rounded-md p-3">
                  <p className="text-red-400 text-sm">{passwordError}</p>
                </div>
              )}

              {passwordSuccess && (
                <div className="bg-green-950 border border-green-800 rounded-md p-3">
                  <p className="text-green-400 text-sm">
                    Password changed successfully!
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError("");
                    setPasswordSuccess(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="flex-1 py-2 px-4 bg-black border border-gray-800 hover:border-gray-700 rounded-md text-gray-400 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 px-4 bg-[#D7B387] hover:bg-[#c9a577] rounded-md text-black text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
