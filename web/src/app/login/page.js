"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { post, loading, error } = useApi();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { success, data } = await post("/auth/login", { email, password });

    if (success && data?.token) {
      login(data.token, data.user);
      router.push("/");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 lg:p-12 font-sans relative">
      {/* Background Graphic Image to fill the screen subtly */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/abstract_architecture.png"
          alt="Abstract Architecture"
          fill
          className="object-cover object-center opacity-30 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-[#090a0f]/80 z-10"></div>
      </div>

      <div className="w-full max-w-[1280px] glass-panel rounded-[24px] overflow-hidden flex flex-col lg:flex-row min-h-[85vh] shadow-2xl relative z-20">
        
        {/* Left Side - Graphic & Branding */}
        <div className="w-full lg:w-1/2 relative flex flex-col justify-between p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20">
          {/* Header */}
          <div className="z-10">
            <Link href="/" className="text-white text-xl font-bold tracking-[0.2em] hover:text-blue-400 transition-colors">
              ETHEREAL
            </Link>
          </div>

          {/* Bottom Text content */}
          <div className="z-10 mt-auto">
            <h2 className="text-4xl lg:text-6xl text-white font-light leading-tight mb-4 tracking-tighter">
              The <span className="text-gradient-accent font-normal italic">Digital</span><br />
              <span className="font-normal">Curator</span>
            </h2>
            <p className="text-slate-400 text-base lg:text-lg mb-6 max-w-md">
              Enter your private gallery of curated essentials. Every piece is an intentional choice for the modern minimalist.
            </p>
            <p className="text-slate-500 text-xs font-medium tracking-wide uppercase">
              © {new Date().getFullYear()} The Ethereal Boutique. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-transparent relative">
          <div className="w-full max-w-[400px]">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl text-white font-black mb-2 tracking-tighter">Welcome back</h2>
              <p className="text-slate-400">Enter your details to access the boutique</p>
              {error && <p className="text-red-400 mt-2 text-sm bg-red-400/10 px-3 py-2 rounded border border-red-500/20">{error}</p>}
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="curator@ethereal.com"
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3.5 outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase">
                    Password
                  </label>
                  <a href="#" className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">
                    FORGOT?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3.5 outline-none transition-all placeholder:text-slate-600 tracking-widest"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg py-3.5 transition-all mt-2 disabled:opacity-50 hover-glow shadow-lg shadow-blue-900/20"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="px-4 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Or continue with
              </span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 rounded-lg py-3 hover:bg-white/10 transition-colors"
              >
                <span className="text-xs font-bold text-slate-300">GOOGLE</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 rounded-lg py-3 hover:bg-white/10 transition-colors"
              >
                <span className="text-xs font-bold text-slate-300">APPLE</span>
              </button>
            </div>

            {/* Footer Form */}
            <div className="mt-12 text-center">
              <p className="text-sm text-slate-400">
                New to Ethereal?{" "}
                <Link href="/register" className="font-bold text-blue-500 hover:text-blue-400 transition-colors">
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
