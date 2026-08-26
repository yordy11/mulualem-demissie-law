"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("mulualemdm66@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Verify credentials
    setTimeout(() => {
      if (
        (email.trim().toLowerCase() === "mulualemdm66@gmail.com" ||
          email.trim().toLowerCase() === "admin@demissielaw.com" ||
          email.trim().toLowerCase() === "admin") &&
        (password === "admin123" || password === "admin" || password === "123456")
      ) {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("admin_user", email);
        }
        router.push("/admin");
      } else {
        setError("Invalid email or password. Please check your credentials.");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-6">
      {/* Container */}
      <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 shadow-xl space-y-8">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative h-16 w-64">
            <Image
              src="/attorney-logo.png"
              alt="MULUALEM DEMISSIE ZERIHUN - Lawyer and Attorney"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          <div>
            <h1
              className="text-xl font-bold text-[#111827] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Admin Portal
            </h1>
            <p className="text-xs text-[#6B7280] mt-1">
              Secure practice management login
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2 border border-red-200">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mulualemdm66@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
              />
            </div>
          </div>

          {/* Preset Demo Credentials Pill */}
          <div className="p-3 bg-[#F9FAFB] rounded-lg border border-gray-100 text-[11px] text-gray-600 space-y-1">
            <p className="font-semibold text-gray-800 flex items-center gap-1">
              <ShieldCheck size={13} className="text-[#B8860B]" />
              Default Credentials:
            </p>
            <p>
              Email: <code className="text-[#111827] font-mono">mulualemdm66@gmail.com</code>
            </p>
            <p>
              Password: <code className="text-[#111827] font-mono">admin123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {isLoading ? "AUTHENTICATING..." : "SIGN IN TO PORTAL"}
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <Link
            href="/"
            className="text-xs text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            &larr; Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
