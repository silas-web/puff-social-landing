"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  MessageSquare,
  Twitter,
  Mail,
  Clock,
  Wrench,
  CheckCircle2,
  Trash2,
  PlusCircle,
  Loader2,
  LogOut,
  Lock,
  Calendar,
  Globe,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ─── */
type FeedbackStatus = "pending" | "in-progress" | "resolved";

interface FeedbackItem {
  id: string;
  text: string;
  userId: string;
  userEmail: string;
  userDisplayName: string;
  createdAt: any;
  platform: string;
  page: string;
  status: FeedbackStatus;
  resolved: boolean;
}

interface SocialPost {
  id: string;
  text: string;
  authorUsername: string;
  authorName: string;
  url: string;
  createdAt: any;
  addedBy?: string;
}

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: any;
  source?: string;
}

const STATUS_CONFIG: Record<
  FeedbackStatus,
  { label: string; color: string; bg: string; icon: typeof Clock }
> = {
  pending: { label: "Pending", color: "#D97706", bg: "#FEF3C7", icon: Clock },
  "in-progress": {
    label: "In Progress",
    color: "#2563EB",
    bg: "#DBEAFE",
    icon: Wrench,
  },
  resolved: {
    label: "Resolved",
    color: "#059669",
    bg: "#D1FAE5",
    icon: CheckCircle2,
  },
};

const STATUS_ORDER: FeedbackStatus[] = ["pending", "in-progress", "resolved"];

/* ─── Helper ─── */
function formatDate(timestamp: any): string {
  if (!timestamp) return "Unknown";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

async function getIdToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return user.getIdToken();
}

/* ═══════════════════════════════════════════
   LOGIN GATE — Firebase email/password
   Only @puffsocialapp.com emails allowed
   ═══════════════════════════════════════════ */
function LoginGate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) return;

    // Client-side domain check
    if (!trimmedEmail.endsWith("@puffsocialapp.com")) {
      setError("Access restricted to @puffsocialapp.com emails only.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
      // onAuthStateChanged in the parent will handle the rest
    } catch (err: any) {
      console.error("Login error:", err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Invalid email or password.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 mb-4 shadow-lg shadow-green-900/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Sign in with your @puffsocialapp.com email
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@puffsocialapp.com"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
            />
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN ADMIN PAGE
   ═══════════════════════════════════════════ */
export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<
    "feedback" | "social" | "waitlist"
  >("waitlist");

  // Feedback state
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [filter, setFilter] = useState<FeedbackStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Social state
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [socialLoading, setSocialLoading] = useState(true);
  const [newPostAuthor, setNewPostAuthor] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const [newPostUrl, setNewPostUrl] = useState("");
  const [submittingPost, setSubmittingPost] = useState(false);

  // Waitlist state
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [waitlistLoading, setWaitlistLoading] = useState(true);

  // Listen for Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.email?.endsWith("@puffsocialapp.com")) {
        setUser(firebaseUser);
      } else {
        setUser(null);
        if (firebaseUser) {
          // Signed in but not a puffsocialapp.com email — sign them out
          signOut(auth);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Real-time listeners (only when authenticated)
  useEffect(() => {
    if (!user) return;

    const unsubs: (() => void)[] = [];

    // Feedback
    const fbQ = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
    unsubs.push(
      onSnapshot(
        fbQ,
        (snap) => {
          setFeedbackList(
            snap.docs.map((d) => ({ id: d.id, ...d.data() } as FeedbackItem))
          );
          setFeedbackLoading(false);
        },
        () => setFeedbackLoading(false)
      )
    );

    // Social posts
    const spQ = query(
      collection(db, "social_posts"),
      orderBy("createdAt", "desc")
    );
    unsubs.push(
      onSnapshot(
        spQ,
        (snap) => {
          setSocialPosts(
            snap.docs.map((d) => ({ id: d.id, ...d.data() } as SocialPost))
          );
          setSocialLoading(false);
        },
        () => setSocialLoading(false)
      )
    );

    // Waitlist
    const wlQ = query(
      collection(db, "waitlist"),
      orderBy("createdAt", "desc")
    );
    unsubs.push(
      onSnapshot(
        wlQ,
        (snap) => {
          setWaitlistEntries(
            snap.docs.map((d) => ({ id: d.id, ...d.data() } as WaitlistEntry))
          );
          setWaitlistLoading(false);
        },
        () => setWaitlistLoading(false)
      )
    );

    return () => unsubs.forEach((fn) => fn());
  }, [user]);

  /* ─── Mutation handlers ─── */
  const handleStatusChange = async (
    feedbackId: string,
    newStatus: FeedbackStatus
  ) => {
    setUpdatingId(feedbackId);
    try {
      const token = await getIdToken();
      await fetch("/api/admin/feedback", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ feedbackId, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddPost = async () => {
    if (!newPostText.trim() || !newPostAuthor.trim()) return;
    setSubmittingPost(true);
    try {
      const token = await getIdToken();
      await fetch("/api/admin/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          authorUsername: newPostAuthor,
          text: newPostText,
          url: newPostUrl,
        }),
      });
      setNewPostAuthor("");
      setNewPostText("");
      setNewPostUrl("");
    } catch (err) {
      console.error("Failed to add post:", err);
    } finally {
      setSubmittingPost(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Delete this social post?")) return;
    try {
      const token = await getIdToken();
      await fetch("/api/admin/social", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  /* ─── Derived data ─── */
  const filteredFeedback =
    filter === "all"
      ? feedbackList
      : feedbackList.filter((item) => item.status === filter);

  const counts = {
    all: feedbackList.length,
    pending: feedbackList.filter((f) => f.status === "pending").length,
    "in-progress": feedbackList.filter((f) => f.status === "in-progress")
      .length,
    resolved: feedbackList.filter((f) => f.status === "resolved").length,
  };

  // ── Auth loading ──
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  // ── Not signed in ──
  if (!user) {
    return <LoginGate />;
  }

  const sections = [
    {
      id: "feedback" as const,
      label: "Feedback",
      count: counts.all,
      icon: MessageSquare,
    },
    {
      id: "social" as const,
      label: "Social",
      count: socialPosts.length,
      icon: Twitter,
    },
    {
      id: "waitlist" as const,
      label: "Waitlist",
      count: waitlistEntries.length,
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-300 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Puff Social Admin
              </h1>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate">
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs sm:text-sm font-medium shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* ─── Section Tabs ─── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        <div className="flex gap-1.5 sm:gap-2">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`
                  flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-900/30"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300 border border-gray-800/50"
                  }
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{sec.label}</span>
                <span
                  className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {sec.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* ══════════ FEEDBACK TAB ══════════ */}
        {activeSection === "feedback" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              {STATUS_ORDER.map((status) => {
                const cfg = STATUS_CONFIG[status];
                return (
                  <div
                    key={status}
                    className="rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center"
                    style={{ backgroundColor: cfg.bg + "22" }}
                  >
                    <p
                      className="text-xl sm:text-3xl font-bold"
                      style={{ color: cfg.color }}
                    >
                      {counts[status]}
                    </p>
                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: cfg.color + "cc" }}
                    >
                      {cfg.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1">
              {(["all", ...STATUS_ORDER] as const).map((status) => {
                const isActive = filter === status;
                const label =
                  status === "all"
                    ? `All (${counts.all})`
                    : `${STATUS_CONFIG[status].label} (${counts[status]})`;
                return (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-green-600 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700/50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Feedback list */}
            {feedbackLoading ? (
              <LoadingSpinner />
            ) : filteredFeedback.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title="No Feedback Found"
                subtitle={
                  filter === "all"
                    ? "No feedback has been submitted yet."
                    : `No ${filter} feedback items.`
                }
              />
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredFeedback.map((item) => {
                  const statusInfo =
                    STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
                  const isUpdating = updatingId === item.id;
                  const StatusIcon = statusInfo.icon;

                  return (
                    <div
                      key={item.id}
                      className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all hover:border-gray-600/50"
                    >
                      {/* Card header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-sm">
                            {(item.userDisplayName || "?")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">
                              {item.userDisplayName || "Anonymous"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.userEmail || "anonymous"}
                            </p>
                          </div>
                        </div>
                        <span
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: statusInfo.bg + "33",
                            color: statusInfo.color,
                          }}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </div>

                      {/* Feedback text */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {item.text}
                      </p>

                      {/* Meta */}
                      <div className="flex gap-5 mb-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(item.createdAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          {item.platform === "ios" ||
                          item.platform === "android" ? (
                            <Smartphone className="w-3.5 h-3.5" />
                          ) : (
                            <Globe className="w-3.5 h-3.5" />
                          )}
                          {item.platform || "unknown"}
                        </span>
                      </div>

                      {/* Status controls */}
                      <div className="border-t border-gray-700/50 pt-4">
                        <p className="text-xs font-semibold text-gray-500 mb-3">
                          Update Status:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                          {STATUS_ORDER.map((status) => {
                            const cfg = STATUS_CONFIG[status];
                            const isCurrent = item.status === status;
                            return (
                              <button
                                key={status}
                                onClick={() =>
                                  handleStatusChange(item.id, status)
                                }
                                disabled={isCurrent || isUpdating}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                  isCurrent
                                    ? "border-2"
                                    : "bg-gray-700/30 text-gray-500 hover:bg-gray-700/60 hover:text-gray-300 border border-gray-700/30"
                                } disabled:cursor-not-allowed`}
                                style={
                                  isCurrent
                                    ? {
                                        backgroundColor: cfg.bg + "22",
                                        borderColor: cfg.color,
                                        color: cfg.color,
                                      }
                                    : undefined
                                }
                              >
                                {isUpdating && !isCurrent ? (
                                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                                ) : (
                                  cfg.label
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ══════════ SOCIAL TAB ══════════ */}
        {activeSection === "social" && (
          <>
            {/* Add Post Form */}
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Add Social Post
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="@handle (e.g. HIGH_TIMES_Mag)"
                  value={newPostAuthor}
                  onChange={(e) => setNewPostAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/40 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-all"
                />
                <textarea
                  placeholder="Post text..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/40 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-all resize-none"
                />
                <input
                  type="text"
                  placeholder="Tweet URL (optional)"
                  value={newPostUrl}
                  onChange={(e) => setNewPostUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/40 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-all"
                />
                <button
                  onClick={handleAddPost}
                  disabled={
                    submittingPost ||
                    !newPostText.trim() ||
                    !newPostAuthor.trim()
                  }
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                >
                  {submittingPost ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5" />
                      Add Post
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Posts list */}
            {socialLoading ? (
              <LoadingSpinner />
            ) : socialPosts.length === 0 ? (
              <EmptyState
                icon={Twitter}
                title="No Social Posts Yet"
                subtitle="Add posts above to populate the Social tab in the app."
              />
            ) : (
              <div className="space-y-3">
                {socialPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all hover:border-gray-600/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-blue-400 text-sm">
                          @{post.authorUsername}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {post.createdAt?.toDate
                            ? post.createdAt.toDate().toLocaleDateString()
                            : "Just now"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {post.text}
                    </p>
                    {post.addedBy && (
                      <p className="text-xs text-gray-600 mt-3">
                        Added by: {post.addedBy}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ══════════ WAITLIST TAB ══════════ */}
        {activeSection === "waitlist" && (
          <>
            {/* Stats */}
            <div className="rounded-2xl p-6 mb-6 bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-4xl font-bold text-green-400">
                {waitlistEntries.length}
              </p>
              <p className="text-sm font-medium text-green-400/70 mt-1">
                Total Signups
              </p>
            </div>

            {/* Entries */}
            {waitlistLoading ? (
              <LoadingSpinner />
            ) : waitlistEntries.length === 0 ? (
              <EmptyState
                icon={Mail}
                title="No Waitlist Signups Yet"
                subtitle="Share puffsocialapp.com to get signups!"
              />
            ) : (
              <div className="space-y-2">
                {waitlistEntries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-xl px-5 py-4 transition-all hover:border-gray-600/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center text-green-400 text-xs font-bold shrink-0">
                      {waitlistEntries.length - index}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">
                        {entry.email}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {formatDate(entry.createdAt)}
                      </p>
                    </div>
                    {entry.source && (
                      <span className="text-xs text-gray-600 bg-gray-800 px-2 py-1 rounded-lg shrink-0">
                        {entry.source}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Shared UI ─── */
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-green-500" />
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof MessageSquare;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Icon className="w-14 h-14 text-gray-700 mb-4" />
      <p className="text-lg font-semibold text-gray-500">{title}</p>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </div>
  );
}
