import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full mt-20 bg-black/40 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 text-sm font-light tracking-wide">
                <div className="md:col-span-1">
                    <div className="text-xl font-black tracking-tighter text-white mb-6">ETHEREAL</div>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        Redefining the digital shopping experience through architectural minimalism and curated excellence.
                    </p>
                    <div className="flex gap-4">
                        {/* Placeholder for social SVG icons, replacing material symbols */}
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                            X
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                            in
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                            @
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-bold text-white mb-6 tracking-wider">COLLECTION</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li><Link className="hover:text-blue-400 transition-colors" href="/new-arrivals">New Arrivals</Link></li>
                        <li><Link className="hover:text-blue-400 transition-colors" href="/best-sellers">Best Sellers</Link></li>
                        <li><Link className="hover:text-blue-400 transition-colors" href="/lighting">Architectural Lighting</Link></li>
                        <li><Link className="hover:text-blue-400 transition-colors" href="/limited">Limited Editions</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-bold text-white mb-6 tracking-wider">COMPANY</h4>
                    <ul className="space-y-4 text-slate-400">
                        <li><Link className="hover:text-blue-400 transition-colors" href="/story">Our Story</Link></li>
                        <li><Link className="hover:text-blue-400 transition-colors" href="/sustainability">Sustainability</Link></li>
                        <li><Link className="hover:text-blue-400 transition-colors" href="/journal">Journal</Link></li>
                        <li><Link className="hover:text-blue-400 transition-colors" href="/contact">Contact</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-bold text-white mb-6 tracking-wider">NEWSLETTER</h4>
                    <p className="text-slate-400 mb-4">Join the list for early access to new drops.</p>
                    <div className="flex group">
                        <input 
                            className="bg-white/5 border border-white/10 border-r-0 rounded-l-lg w-full px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors" 
                            placeholder="Email address" 
                            type="email"
                        />
                        <button className="bg-blue-600 border border-blue-600 text-white px-5 py-2 rounded-r-lg hover:bg-blue-500 transition-colors font-semibold">
                            Join
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-12">© {new Date().getFullYear()} Ethereal Boutique. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
