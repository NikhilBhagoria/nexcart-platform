"use client";

import Image from "next/image";
import Link from "next/link";
import { Apple } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { login } = useAuth();
  const { request, loading, error } = useApi();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/auth/login", {
        method: "POST",
        body: { email, password }
      });
      if (response && response.token) {
        login(response.token, response.user);
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1c1c] p-6 lg:p-12 font-sans">
      <div className="w-full max-w-[1280px] bg-white rounded-[24px] overflow-hidden flex flex-col lg:flex-row min-h-[85vh] shadow-2xl">
        
        {/* Left Side - Graphic & Branding */}
        <div className="w-full lg:w-1/2 relative bg-[#f5f5f5] flex flex-col justify-between p-12 lg:p-16">
          {/* Header */}
          <div className="z-10">
            <h1 className="text-[#3b3b3b] text-xl font-medium tracking-[0.2em]">E T H E R E A L</h1>
          </div>
          
          {/* Background Graphic Image */}
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent z-10 w-1/2"></div>
             <Image 
                src="/abstract_architecture.png" 
                alt="Abstract Architecture" 
                fill 
                className="object-cover object-right opacity-80"
                priority
             />
          </div>

          {/* Bottom Text content */}
          <div className="z-10 mt-auto">
            <h2 className="text-4xl lg:text-6xl text-[#3b3b3b] font-light leading-tight mb-4">
              The <span className="italic">Digital</span><br />
              <span className="font-normal text-[#1a1a1a]">Curator</span>
            </h2>
            <p className="text-[#6b6b6b] text-base lg:text-lg mb-6 max-w-md">
              Enter your private gallery of curated essentials. Every piece is an intentional choice for the modern minimalist.
            </p>
            <p className="text-[#999999] text-xs font-medium tracking-wide uppercase">
              © 2024 The Ethereal Boutique. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
          <div className="w-full max-w-[400px]">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl text-[#3b3b3b] font-medium mb-2">Welcome back</h2>
              <p className="text-[#737373]">Enter your details to access the boutique</p>
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#888] uppercase mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="curator@ethereal.com"
                  required
                  className="w-full bg-[#f0f2f5] border border-transparent focus:border-[#d0d4dc] focus:bg-white text-[#333] rounded-md px-4 py-3.5 outline-none transition-colors placeholder:text-[#a0a4ab]"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold tracking-widest text-[#888] uppercase">
                    Password
                  </label>
                  <a href="#" className="text-xs font-bold text-[#3b82f6] hover:text-[#2563eb] transition-colors">
                    FORGOT?
                  </a>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#f0f2f5] border border-transparent focus:border-[#d0d4dc] focus:bg-white text-[#333] rounded-md px-4 py-3.5 outline-none transition-colors placeholder:text-[#a0a4ab] tracking-widest"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-md py-3.5 transition-colors mt-2 disabled:opacity-75"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-[#eee]"></div>
              <span className="px-4 text-[11px] font-bold tracking-widest text-[#bbb] uppercase">
                Or continue with
              </span>
              <div className="flex-1 border-t border-[#eee]"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                className="flex items-center justify-center gap-2 border border-[#eee] rounded-md py-3 hover:bg-gray-50 transition-colors"
              >
                {/* Generic Google icon placeholder to avoid adding svg files directly */}
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.369 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.109 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                <span className="text-xs font-bold text-[#555]">GOOGLE</span>
              </button>
              <button 
                type="button" 
                className="flex items-center justify-center gap-2 border border-[#eee] rounded-md py-3 hover:bg-gray-50 transition-colors"
              >
                <Apple size={18} className="text-black" />
                <span className="text-xs font-bold text-[#555]">APPLE</span>
              </button>
            </div>

            {/* Footer Form */}
            <div className="mt-12 text-center">
              <p className="text-sm text-[#777]">
                New to Ethereal?{" "}
                <Link href="#" className="font-bold text-[#3b82f6] hover:text-[#2563eb] transition-colors">
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
