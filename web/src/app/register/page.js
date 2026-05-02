"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const { post, loading, error } = useApi();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { success, data } = await post("/auth/register", { name, email, password });

    if (success && data?.token) {
      login(data.token, data.user);
      router.push("/");
    }
  };
  return (
    <div className="flex min-h-screen relative font-sans">
      {/* Global Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/abstract_architecture.png" // Ensure this image is sleek
          alt="Ethereal Boutique Model"
          fill
          className="object-cover opacity-20 object-top blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-[#090a0f]/80 z-10 w-full h-full pointer-events-none"></div>
      </div>

      {/* Left Side - Graphic & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 lg:p-16 text-white overflow-hidden z-20 border-r border-white/5 bg-black/40 backdrop-blur-md">
        {/* Header */}
        <div className="z-20">
          <Link href="/" className="text-white text-xl font-bold tracking-[0.2em] hover:text-blue-400 transition-colors">
            ETHEREAL
          </Link>
        </div>

        {/* Bottom Text content */}
        <div className="z-20 mt-auto max-w-xl pb-10">
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tighter">
            Curation<br />
            <span className="text-gradient-accent">as an Art Form.</span>
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl font-light max-w-md leading-relaxed">
            Join an exclusive community of curators and collectors defining the next era of digital elegance.
          </p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 z-20 bg-transparent">
        <div className="w-full max-w-[440px] mx-auto flex flex-col justify-center min-h-[90vh] glass-panel p-10 rounded-2xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tighter">Create your account</h2>
            <p className="text-slate-400 text-[15px]">Join the gallery of the curated.</p>
            {error && <p className="text-red-400 mt-2 text-sm bg-red-400/10 px-3 py-2 rounded border border-red-500/20">{error}</p>}
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alexandros Vance"
                required
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3.5 outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
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
              <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3.5 outline-none transition-all placeholder:text-slate-600 tracking-widest pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg py-3.5 transition-all mt-4 hover-glow shadow-lg shadow-blue-900/20 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading &&
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              }
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-4 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Or continue with
            </span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 border border-white/10 bg-white/5 rounded-lg py-3 hover:bg-white/10 transition-colors"
            >
              <span className="text-[13px] font-bold text-slate-300">GOOGLE</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 border border-white/10 bg-white/5 rounded-lg py-3 hover:bg-white/10 transition-colors"
            >
              <span className="text-[13px] font-bold text-slate-300">APPLE</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-slate-400">
              Already a member?{" "}
              <Link href="/login" className="font-semibold text-blue-500 hover:text-blue-400 transition-colors">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-auto pt-6 text-center">
            <p className="text-[10px] tracking-wider text-slate-600 uppercase max-w-[320px] mx-auto leading-relaxed">
              By joining, you agree to our <a href="#" className="font-bold text-slate-400 hover:text-white">Terms of Service</a> & <a href="#" className="font-bold text-slate-400 hover:text-white">Privacy Policy</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
