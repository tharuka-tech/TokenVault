import React, { useState, useEffect, useCallback } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Login from "./components/Login";
import api from "./services/api";

const LOTTIE_URL =
  "https://lottie.host/f3bd7fca-7148-40db-919a-e66df0292a0a/Ou8fhiAX0y.lottie";

const LOADING_LOTTIE_URL =
  "https://lottie.host/f5dc60bd-2170-4dee-b669-13138a18363e/rPI80GoRQy.lottie";

/* ═══════════════════════════════════════
   LOGOUT MODAL
   ═══════════════════════════════════════ */
function LogoutModal({ onConfirm, onCancel, title = "Sign Out?", message = "Are you sure you want to log out?", confirmText = "Yes, Logout", colorClass = "from-red-400 to-rose-600 shadow-red-300" }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-backdrop-in px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onCancel} />
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-sm w-full animate-modal-bounce">
        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg ${colorClass}`}>
          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="mt-8 text-center mb-6">
          <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">{message}</p>
        </div>
        <div className="flex gap-3">
          {onCancel && (
            <button onClick={onCancel} className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95">
              Cancel
            </button>
          )}
          <button onClick={onConfirm} className={`flex-1 px-4 py-3.5 rounded-2xl bg-gradient-to-r ${colorClass.split(' shadow-')[0]} text-white font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   INFO ROW
   ═══════════════════════════════════════ */
function InfoRow({ label, value, delay = "" }) {
  return (
    <div className={`flex items-center justify-between py-3.5 border-b border-white/10 last:border-0 animate-fade-in-up ${delay}`}>
      <span className="text-sm font-semibold text-purple-300">{label}</span>
      <span className="text-sm font-medium text-white">{value || "N/A"}</span>
    </div>
  );
}

/* ═══════════════════════════════════════
   FLOATING ORB
   ═══════════════════════════════════════ */
function Orb({ className }) {
  return <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />;
}

/* ═══════════════════════════════════════
   PROFILE PANEL
   ═══════════════════════════════════════ */
function ProfilePanel({ profile, showDetails, isLoading }) {
  const [panel, setPanel] = useState("lottie");
  const [animClass, setAnimClass] = useState("animate-slide-in-bottom");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchTo = useCallback((target) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setAnimClass("animate-slide-out-top");
    setTimeout(() => {
      setPanel(target);
      setAnimClass("animate-slide-in-bottom");
      setTimeout(() => { setIsTransitioning(false); }, 500);
    }, 350);
  }, [isTransitioning]);

  useEffect(() => {
    const target = showDetails ? "details" : "lottie";
    if (panel !== target) switchTo(target);
  }, [showDetails, panel, switchTo]);

  const emp = profile?.employee;
  const avatarUrl = emp?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp?.name || "User")}&background=7c3aed&color=fff&size=256&bold=true`;

  return (
    <div className="overflow-hidden min-h-[320px] flex items-center justify-center">
      {panel === "lottie" && (
        <div key="lottie" className={`w-full flex flex-col items-center justify-center py-6 px-4 ${animClass}`}>
          <DotLottieReact src={LOTTIE_URL} loop autoplay style={{ width: 260, height: 260 }} />
          <p className="text-purple-300 text-sm mt-2">Click <strong className="text-white">View Secured Data</strong> to call secured data.</p>
        </div>
      )}
      {panel === "details" && (
        <div key="details" className={`w-full p-8 ${animClass}`}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
              <DotLottieReact
                src={LOADING_LOTTIE_URL}
                loop
                autoplay
                style={{ width: 120, height: 120 }}
              />
              <p className="text-purple-400 text-[10px] font-bold tracking-widest uppercase mt-2">
                Decrypting Vault Data
              </p>
            </div>
          ) : profile ? (
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 blur-md opacity-50 scale-110" />
                  <img src={avatarUrl} alt="profile" className="relative w-32 h-32 rounded-2xl object-cover object-top ring-4 ring-violet-500/60 shadow-2xl" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
                </div>
                <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider border border-violet-500/30">{emp?.section || "Staff"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-extrabold text-white mb-0.5">{emp?.name}</h3>
                <p className="text-purple-400 text-sm mb-6 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>@{profile?.username}</p>
                <div className="bg-white/5 rounded-2xl px-5 border border-white/10">
                  <InfoRow delay="stagger-1" label="NIC" value={emp?.nic} />
                  <InfoRow delay="stagger-2" label="Address" value={emp?.address} />
                  <InfoRow delay="stagger-3" label="Gender" value={emp?.gender} />
                  <InfoRow delay="stagger-4" label="Section" value={emp?.section} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════ */
function App() {
  const [user, setUser]                     = useState(null);
  const [profile, setProfile]               = useState(null);
  const [showDetails, setShowDetails]       = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [dropdownOpen, setDropdownOpen]     = useState(false);

  const fetchMyProfile = async (silent = false) => {
    if (!silent) setProfileLoading(true);
    try {
      const res = await api.get("/dashboard/my-profile");
      setProfile(res.data);
      // On success, we confirm we are logged in (for auto-login flow)
      if (isInitializing) setUser({ loggedIn: true });
    } catch (err) {
      console.error("Profile error:", err);
      if (isInitializing) localStorage.clear();
    } finally {
      if (!silent) setTimeout(() => setProfileLoading(false), 800);
      setIsInitializing(false);
    }
  };

  const handleToggleDetails = () => {
    const nextState = !showDetails;
    setShowDetails(nextState);
    if (nextState) fetchMyProfile();
  };

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) await api.post("/auth/logout", { refreshToken });
    } catch (err) { console.error(err); }
    localStorage.clear();
    setUser(null);
    setProfile(null);
    setShowLogoutModal(false);
    setSessionExpired(false);
    setIsInitializing(false);
  }, []);

  /* ── Initialize: Check for token & Listen for Expire ── */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchMyProfile(true); 
    } else {
      setIsInitializing(false);
    }

    const handleExpiry = () => setSessionExpired(true);
    window.addEventListener("session-expired", handleExpiry);
    return () => window.removeEventListener("session-expired", handleExpiry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Sync: Fetch profile when user logs in ── */
  useEffect(() => {
    if (user && !profile && !profileLoading && !isInitializing) {
      fetchMyProfile(true);
    }
  }, [user, profile, profileLoading, isInitializing]);

  const showSplash = isInitializing || (user && !profile && !showDetails);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <DotLottieReact
          src={LOADING_LOTTIE_URL}
          loop
          autoplay
          style={{ width: 220, height: 220 }}
        />
        <p className="text-violet-400 text-[10px] font-black tracking-[0.4em] animate-pulse uppercase mt-2">
          {isInitializing ? "Restoring Vault Session" : "Decrypting Security Credentials"}
        </p>
      </div>
    );
  }

  if (!user) return <Login onLogin={setUser} />;

  const emp = profile?.employee;
  const avatarUrl = emp?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp?.name || "User")}&background=7c3aed&color=fff&size=256&bold=true`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden relative">
      <Orb className="w-96 h-96 bg-violet-600/20 top-[-5rem] left-[-4rem] animate-float" />
      <Orb className="w-80 h-80 bg-purple-500/15 top-1/3 right-[-3rem] animate-float-slow" />
      <Orb className="w-64 h-64 bg-indigo-500/20 bottom-10 left-1/4 animate-float-slower" />
      <Orb className="w-48 h-48 bg-fuchsia-600/15 bottom-[-2rem] right-1/3 animate-float" />

      {/* Modals */}
      {showLogoutModal && (
        <LogoutModal onConfirm={logout} onCancel={() => setShowLogoutModal(false)} />
      )}
      
      {/* Session Expired Modal */}
      {sessionExpired && (
        <LogoutModal 
          onConfirm={logout} 
          onCancel={null} // Force logout
          title="Session Expired"
          message="Your security tokens are no longer valid. For your protection, you must sign in again."
          confirmText="Return to Login"
          colorClass="from-amber-400 to-orange-600 shadow-amber-300"
        />
      )}

      <header className="sticky top-0 z-40 glass border-b border-white/10 animate-slide-down">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/50 animate-pulse-glow">
              <svg className="w-5 h-5 text-white animate-logo-rotate-wait" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            </div>
            <span className="gradient-text font-extrabold text-lg tracking-tight">Token Vault</span>
          </div>

          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group">
              <img src={avatarUrl} alt="avatar" className="w-9 h-9 rounded-full ring-2 ring-violet-400 ring-offset-1 ring-offset-transparent object-cover object-top" />
              <div className="text-left hidden sm:block">
                <p className="text-white text-sm font-semibold leading-tight">{emp?.name || "User"}</p>
              </div>
              <svg className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-fade-in-scale">
                <div className="px-4 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                  <div className="flex items-center gap-3">
                    <img src={avatarUrl} alt="avatar" className="w-12 h-12 rounded-full ring-2 ring-white/30 object-cover object-top" />
                    <div><p className="font-bold text-base">{emp?.name || "User"}</p><p className="text-violet-200 text-sm">@{profile?.username || "loading..."}</p></div>
                  </div>
                </div>
                <div className="py-2">
                  <button onClick={() => { setDropdownOpen(false); setShowLogoutModal(true); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 group">
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {dropdownOpen && <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />}
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-10 animate-fade-in-up">
          <p className="text-purple-400 text-sm font-medium mb-1 uppercase tracking-widest leading-none">Vault Security Status: <span className="text-emerald-400 font-black animate-pulse">Protected</span></p>
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Welcome back, <span className="gradient-text animate-gradient-shift">{emp?.name?.split(" ")[0] || "User"}</span> <span className="animate-wave">👋</span>
          </h1>
          <p className="text-purple-300/70 mt-2 text-sm italic">"Your session is protected by a dual-token vault mechanism."</p>
        </div>

        <div className="glass rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in-up stagger-2">
          <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50 animate-pulse" />
              <h2 className="text-white font-bold text-lg">Secure Data Panel</h2>
            </div>
            <div className="flex items-center gap-3">
              {showDetails && (
                <button onClick={() => fetchMyProfile()} disabled={profileLoading} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 transition-all active:scale-95 disabled:opacity-50">
                   <svg className={`w-4 h-4 ${profileLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                </button>
              )}
              <button onClick={handleToggleDetails} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-900/50 transition-all hover:scale-105">
                {showDetails ? "Hide Details" : "View Secured Data"}
              </button>
            </div>
          </div>
          <ProfilePanel profile={profile} showDetails={showDetails} isLoading={profileLoading} />
        </div>

        <div className="text-center mt-12 space-y-2 animate-fade-in-up stagger-4 opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-white text-xs font-bold tracking-[0.2em] uppercase">JWT Verified Connection</p>
          <p className="text-purple-400 text-[10px]">© 2026 TOKEN VAULT INC · ENTERPRISE EDITION</p>
        </div>
      </main>
    </div>
  );
}

export default App;