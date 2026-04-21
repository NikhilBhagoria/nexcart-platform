import Link from 'next/link';

export default function Header() {
    // Note: Mock cart item count until Phase 3 Context is configured.
    const cartItemCount = 3;

    return (
        <nav className="glass-panel fixed top-0 w-full z-50 border-b border-white/5">
            <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:text-blue-400 transition-colors">
                    ETHEREAL
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/new-arrivals" className="text-blue-400 font-semibold border-b-2 border-blue-500 pb-1 tracking-tight hover:text-blue-300 transition-colors">
                        New Arrivals
                    </Link>
                    <Link href="/collections" className="text-slate-400 hover:text-white transition-colors tracking-tight">
                        Collections
                    </Link>
                    <Link href="/editorial" className="text-slate-400 hover:text-white transition-colors tracking-tight">
                        Editorial
                    </Link>
                </div>

                {/* Icons & Actions */}
                <div className="flex items-center gap-6">
                    {/* Search */}
                    <div className="relative hidden lg:block">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm w-64 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-colors" 
                            placeholder="Search curated list..." 
                            type="text" 
                        />
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {/* User Account */}
                        <button className="text-slate-400 hover:text-white transition-all p-2 relative group">
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                        
                        {/* Shopping Cart */}
                        <Link href="/cart" className="text-slate-400 hover:text-white transition-all p-2 relative group flex items-center">
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#090a0f]">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
