import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import api from "../services/api";

const LOGIN_LOTTIE_URL =
  "https://lottie.host/80111f18-d7b1-4ce8-8c10-8d5ba303b609/jO0rYIskWb.lottie";

/* ═══════════════════════════════════════
   FLOATING ORB
   ═══════════════════════════════════════ */
function Orb({ className }) {
  return <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />;
}

function Login({ onLogin }) {
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      localStorage.setItem("accessToken",  response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      onLogin(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed! Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* ── Background Orbs (Dashboard Style) ── */}
      <Orb className="w-96 h-96 bg-violet-600/20 top-[-5rem] left-[-4rem] animate-float" />
      <Orb className="w-80 h-80 bg-purple-500/15 top-1/3 right-[-3rem] animate-float-slow" />
      <Orb className="w-64 h-64 bg-indigo-500/20 bottom-10 left-1/4 animate-float-slower" />
      <Orb className="w-48 h-48 bg-fuchsia-600/15 bottom-[-2rem] right-1/3 animate-float" />

      {/* ── Login Card (High-End Glassmorphism) ── */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        
        <div className="glass rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
          
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 animate-gradient-shift" />

          <div className="px-8 pt-8 pb-10 space-y-7">
            
            {/* ── Header with Brand Logo ── */}
            <div className="text-center space-y-4">
              <div className="flex justify-center -mb-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/50 animate-pulse-glow transition-transform duration-500 hover:scale-110">
                  <svg className="w-8 h-8 text-white animate-logo-rotate-wait" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl font-black gradient-text animate-gradient-shift tracking-tight">
                  Token Vault
                </h1>
                <p className="text-purple-400/80 text-[10px] font-black uppercase tracking-[0.4em]">
                  Security Protocol Active
                </p>
              </div>
            </div>

            {/* ── Error Alert ── */}
            {error && (
              <div className="flex items-start gap-3 bg-red-400/10 border border-red-500/20 rounded-2xl p-4 animate-shake">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-200 text-xs font-semibold leading-relaxed">{error}</p>
              </div>
            )}

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Username */}
              <div className="space-y-2 animate-fade-in-up stagger-1">
                <label className="block text-[10px] font-black text-purple-400 uppercase tracking-widest pl-1">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-purple-400/40 group-focus-within:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] hover:border-white/20 transition-all duration-300 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2 animate-fade-in-up stagger-2">
                <label className="block text-[10px] font-black text-purple-400 uppercase tracking-widest pl-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-purple-400/40 group-focus-within:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] hover:border-white/20 transition-all duration-300 text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/40 hover:text-violet-400 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM10 12a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 110 8 4 4 0 010-8z" clipRule="evenodd" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 animate-fade-in-up stagger-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-[1.25rem] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-black text-sm shadow-[0_20px_40px_-12px_rgba(124,58,237,0.4)] hover:shadow-[0_20px_40px_-8px_rgba(124,58,237,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 group"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Secure Access
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center pt-6 opacity-30">
              <p className="text-white text-[9px] font-black uppercase tracking-[0.5em] leading-none">
                Enterprise Vault System 2026
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-white/20 text-[10px] font-bold uppercase tracking-widest animate-fade-in-up stagger-4">
          Dual-Token Security Active · JWT Verified
        </div>
      </div>
    </div>
  );
}

export default Login;