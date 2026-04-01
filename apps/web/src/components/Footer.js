import React from 'react'

export default function Footer() {
    return (
        <footer className="w-full mt-20 bg-slate-50 dark:bg-slate-950 grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 text-sm font-light tracking-wide">
            <div className="md:col-span-1">
                <div className="text-lg font-bold text-slate-900 dark:text-white mb-6">Ethereal Boutique</div>
                <p className="text-slate-500 leading-relaxed mb-6">Redefining the digital shopping experience through architectural minimalism and curated excellence.</p>
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-blue-700">public</span>
                    <span className="material-symbols-outlined text-blue-700">share</span>
                    <span className="material-symbols-outlined text-blue-700">alternate_email</span>
                </div>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Collection</h4>
                <ul className="space-y-4 text-slate-500">
                    <li><a className="hover:underline decoration-blue-500/30 hover:text-blue-600" href="#">New Arrivals</a></li>
                    <li><a className="hover:underline decoration-blue-500/30 hover:text-blue-600" href="#">Best Sellers</a></li>
                    <li><a className="hover:underline decoration-blue-500/30 hover:text-blue-600" href="#">Architectural Lighting</a></li>
                    <li><a className="hover:underline decoration-blue-500/30 hover:text-blue-600" href="#">Limited Editions</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
                <ul className="space-y-4 text-slate-500">
                    <li><a className="hover:underline decoration-blue-500/30 hover:text-blue-600" href="#">Our Story</a></li>
                    <li><a className="hover:underline decoration-blue-500/30 hover:text-blue-600" href="#">Sustainability</a></li>
                    <li><a className="hover:underline decoration-blue-500/30 hover:text-blue-600" href="#">Journal</a></li>
                    <li><a className="hover:underline decoration-blue-500/30 hover:text-blue-600" href="#">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Newsletter</h4>
                <p className="text-slate-500 mb-4">Join the list for early access to new drops.</p>
                <div className="flex">
                    <input className="bg-white dark:bg-slate-900 border-none rounded-l-lg w-full text-xs focus:ring-1 focus:ring-blue-500/30" placeholder="Email address" type="email"/>
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-r-lg hover:bg-blue-800 transition-colors">Join</button>
                </div>
                <p className="text-[10px] text-slate-400 mt-6 mt-20">© 2024 Ethereal Boutique. All rights reserved.</p>
            </div>
        </footer>
    )
}
