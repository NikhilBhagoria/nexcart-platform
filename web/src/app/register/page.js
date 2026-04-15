"use client";

import Image from "next/image";
import Link from "next/link";
import { Apple, Eye, ArrowRight } from "lucide-react";
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
    
    // Assuming response gives { token, user }
    if (success && data?.token) {
      login(data.token, data.user);
      router.push("/");
    }
  };
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side - Graphic & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 lg:p-16 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-[#2a2d34]">
          <Image 
            src="/abstract_architecture.png" // Placeholder, in reality this would be the ethereal_boutique_hero image
            alt="Ethereal Boutique Model" 
            fill 
            className="object-cover opacity-90 object-top"
            priority
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10 w-full h-full pointer-events-none"></div>
        </div>

        {/* Header */}
        <div className="z-20">
          <Link href="/" className="text-white text-xl font-bold tracking-tight">
            The Ethereal Boutique
          </Link>
        </div>
        
        {/* Bottom Text content */}
        <div className="z-20 mt-auto max-w-xl pb-10">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Curation<br />
            as an Art Form.
          </h1>
          <p className="text-white/80 text-lg lg:text-xl font-light max-w-md leading-relaxed">
            Join an exclusive community of curators and collectors defining the next era of digital elegance.
          </p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-[440px] mx-auto flex flex-col justify-center min-h-[90vh]">
          {/* Header */}
          <div className="mb-8 pt-10">
            <h2 className="text-3xl font-bold text-[#111827] mb-2 tracking-tight">Create your account</h2>
            <p className="text-[#6b7280] text-[15px]">Join the gallery of the curated.</p>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-[#6b7280] uppercase mb-2">
                Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alexandros Vance"
                required
                className="w-full bg-[#f3f4f6] text-[#111827] rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#3b82f6]/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-widest text-[#6b7280] uppercase mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="curator@ethereal.com"
                required
                className="w-full bg-[#f3f4f6] text-[#111827] rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#3b82f6]/50 focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold tracking-widest text-[#6b7280] uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#f3f4f6] text-[#111827] rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-[#9ca3af] tracking-widest focus:ring-2 focus:ring-[#3b82f6]/50 focus:bg-white pr-12"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4b5563] transition-colors"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-xl py-3.5 transition-colors mt-4 shadow-sm shadow-blue-500/20 disabled:opacity-75"
            >
              {loading ? "Creating Account..." : "Create Account"} 
              {!loading && <ArrowRight size={18} className="ml-1" />}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-[#f3f4f6]"></div>
            <span className="px-4 text-[10px] font-bold tracking-widest text-[#9ca3af] uppercase">
              Or continue with
            </span>
            <div className="flex-1 border-t border-[#f3f4f6]"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              className="flex items-center justify-center gap-3 bg-[#f3f4f6] rounded-xl py-3.5 hover:bg-[#e5e7eb] transition-colors"
            >
              {/* Google SVG */}
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.369 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.109 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              <span className="text-[13px] font-medium text-[#4b5563]">Google</span>
            </button>
            <button 
              type="button" 
              className="flex items-center justify-center gap-3 bg-[#f3f4f6] rounded-xl py-3.5 hover:bg-[#e5e7eb] transition-colors"
            >
              <Apple size={18} fill="currentColor" className="text-[#111827]" />
              <span className="text-[13px] font-medium text-[#4b5563]">Apple</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-[#6b7280]">
              Already a member?{" "}
              <Link href="/login" className="font-semibold text-[#3b82f6] hover:text-[#2563eb] transition-colors">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-auto pt-10 pb-6 text-center">
             <p className="text-[10px] tracking-wider text-[#9ca3af] uppercase max-w-[320px] mx-auto leading-relaxed">
                By joining, you agree to our <a href="#" className="font-bold text-[#6b7280] hover:text-[#374151]">Terms of Service</a> & <a href="#" className="font-bold text-[#6b7280] hover:text-[#374151]">Privacy Policy</a>
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}
