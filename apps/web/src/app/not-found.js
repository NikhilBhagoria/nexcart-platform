export default function NotFound() {
    return (
        <main className="pt-32 pb-24">

            <section className="min-h-[716px] flex flex-col justify-center px-8 md:px-24 relative overflow-hidden">

                <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                    <h2 className="text-[40rem] font-black leading-none tracking-tighter">404</h2>
                </div>
                <div className="max-w-4xl z-10">
                    <span className="label-md uppercase tracking-[0.2em] text-on-surface-variant font-semibold mb-6 block">Error Code 404</span>
                    <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-[-0.04em] leading-[0.9] text-on-surface mb-8">
                        LOST IN<br />DESIGN.
                    </h1>
                    <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl mb-12 font-light leading-relaxed">
                        The page you're looking for has moved beyond the horizon. Let us guide you back to our curated collections.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="btn-gradient text-on-tertiary px-10 py-5 rounded-md font-semibold tracking-wide text-sm uppercase hover:opacity-90 transition-all active:scale-95">
                            EXPLORE NEW ARRIVALS
                        </button>
                        <button className="px-10 py-5 rounded-md font-semibold tracking-wide text-sm uppercase text-on-surface hover:bg-surface-container-high transition-all border border-outline-variant/20 active:scale-95">
                            BACK TO HOME
                        </button>
                    </div>
                </div>
            </section>

            <section className="mt-16 px-8 md:px-24">
                <div className="flex items-end justify-between mb-16">
                    <div className="max-w-md">
                        <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-4 uppercase">CURRENTLY TRENDING</h2>
                        <div className="h-px w-24 bg-tertiary"></div>
                    </div>
                    <div className="hidden md:block">
                        <a className="text-tertiary font-medium flex items-center gap-2 group" href="#">
                            View Entire Gallery
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_right_alt</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    <div className="md:col-span-5 group relative">
                        <div className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-xl mb-6 relative">
                            <img alt="Premium Leather Tote" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Close-up of a minimalist black leather designer tote bag with clean lines on a pale grey stone surface with soft shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaEMXJE2i6JyY5ra0JiLznhC59NOsUMhHNXnAohI9sU63d2FzQCXgGQBhlGCRnjkoTFdzqwTMkzmSh2MHwkZQGprSEukEQ47WN8sorFxZk0SPJzncr3pUfCEp4VUz_KuQi2ZoD78E8KcwPVZGSMfl-rF2GsudVB2OIyEhlGqI7qvUQaH5esbFT6AmyhMEOZHRvXmloUcfBA6rMbLRe6z4iglOA2Swfc7p3u5xJ_5OFj-AOCr19tZj_w-rraYC3XaVar5u2Lb65Bec" />

                            <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="bg-white/80 backdrop-blur-xl p-4 rounded-lg flex justify-between items-center shadow-lg">
                                    <span className="font-bold text-sm tracking-tight text-on-surface">QUICK VIEW</span>
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="label-md uppercase tracking-widest text-on-surface-variant mb-1">Leather Goods</p>
                                <h3 className="text-xl font-semibold text-on-surface">ARCHIVE TOTE NO. 1</h3>
                            </div>
                            <span className="text-lg font-light text-on-surface">$1,240</span>
                        </div>
                    </div>

                    <div className="hidden md:block md:col-span-1"></div>

                    <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:mt-24">

                        <div className="group">
                            <div className="aspect-square bg-surface-container-low overflow-hidden rounded-xl mb-6 relative">
                                <img alt="Minimalist Watch" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="High-end minimal wristwatch with white dial and brushed silver case resting on a stack of architectural design books" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhR_NO_bxUPPRINPMqYV9l-o7h2Cx51GkfiOuBEK4qY2f4Wn8CYjH9CUUg5kqZRaM8xA_BmGBrAeaviwVzUayNUdjUtP8Uz2DGMxqwd9zDE801QZ4v8B5SI3dJ9bGM9qoVbMcLT0Sxa2Zft0Eexve4U46HxGOFPXSlhnP3TjY5e8nZpkpP40tswxvyQfU18NJHEeynqmVbGAAaroWkHOa1FiGlHwa2qIDql3tTuwEqKcPvGVpN4jGDe2qmaEapY3Ql0knFEM4qQsM" />
                            </div>
                            <p className="label-md uppercase tracking-widest text-on-surface-variant mb-1">Timepieces</p>
                            <h3 className="text-lg font-semibold text-on-surface mb-2">HORIZON SILVER</h3>
                            <span className="text-md font-light text-on-surface-variant">$850</span>
                        </div>

                        <div className="group">
                            <div className="aspect-square bg-surface-container-low overflow-hidden rounded-xl mb-6 relative">
                                <img alt="Sculptural Lamp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="An organic, white sculptural table lamp with a soft glow in a minimalist room with natural morning light and long shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH57FoKtGIrxdW5LIGcHJPAYlEEa0XO0eEfwsqvKLvSB4Fr2iJ7mhHXYyIclyog9RXUKv0GK6wn6WEtSh2252KqTJ159wHuo1tKrUOwCfau149DsnqP0jlvzKJgnfrYp1APD-Tu9BJkOW7SDty6_FBwxrK8Fpfy7puh-x4F9-yVrY_OlhoM95htFhNqO4oQitMgIVQSwe7oh9oDDZeJEHkQg3fyLkWYnDAMTamN0uWbGUZ-Vj93wBsR1hRXcHEiUO2f4m4_YIYCIM" />
                            </div>
                            <p className="label-md uppercase tracking-widest text-on-surface-variant mb-1">Objets</p>
                            <h3 className="text-lg font-semibold text-on-surface mb-2">LUMINA ORB</h3>
                            <span className="text-md font-light text-on-surface-variant">$420</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}