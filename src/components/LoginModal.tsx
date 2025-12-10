import React, { useRef } from "react";
import { signIn, type AuthUser } from "../lib/auth";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  loginError: string;
  setLoginError: (error: string) => void;
  loginLoading: boolean;
  setLoginLoading: (loading: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onLoginSuccess,
  loginError,
  setLoginError,
  loginLoading,
  setLoginLoading,
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";

    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      setLoginLoading(false);
      return;
    }

    try {
      const result = await signIn(email, password);

      if (result.success && result.user) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        setLoginError(result.error || "Login failed");
      }
    } catch (error) {
      setLoginError("An unexpected error occurred");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div
        className="bg-[#1a1f2e] rounded-2xl shadow-2xl w-[400px] relative border border-gray-700/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all z-10 border border-gray-700"
          aria-label="Close"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-1">Sign In</h2>
            <p className="text-gray-400 text-sm">Welcome back to Arteno</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{loginError}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-medium text-gray-400 mb-1.5"
              >
                Email
              </label>
              <input
                ref={emailRef}
                id="login-email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-[#0f1419] border border-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7B387]/50 focus:border-[#D7B387] transition-all placeholder-gray-500 text-sm"
                disabled={loginLoading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-medium text-gray-400 mb-1.5"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                id="login-password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 bg-[#0f1419] border border-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7B387]/50 focus:border-[#D7B387] transition-all placeholder-gray-500 text-sm"
                disabled={loginLoading}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D7B387] hover:bg-[#c49f6c] text-black font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              disabled={loginLoading}
            >
              {loginLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-gray-700/30 text-center">
            <p className="text-gray-400 text-xs mb-1">Need assistance?</p>
            <p className="text-white font-medium">210 440 85 85</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
