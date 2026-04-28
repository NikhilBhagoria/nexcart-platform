import { getAllProducts } from '@/services/productService';
import ProductCard from '@/components/ProductCard';

export const metadata = {
    title: "Ethereal | Curated Excellence",
    description: "Premium digital shopping experience.",
};

export default async function Home() {
    const products = await getAllProducts();

    return (
        <main className="flex-1 flex flex-col pt-24 min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full max-w-7xl mx-auto px-8 py-20 md:py-32 flex flex-col items-center justify-center text-center">
                {/* Subtle background glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 relative z-10 text-white">
                    CURATED <span className="text-gradient-accent">EXCELLENCE</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 relative z-10 leading-relaxed font-light">
                    Redefining the digital shopping experience through architectural minimalism and unparalleled quality.
                </p>
                <button className="relative z-10 px-8 py-4 bg-white text-black font-bold tracking-wide rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    EXPLORE COLLECTION
                </button>
            </section>

            {/* Products Grid Section */}
            <section className="w-full max-w-7xl mx-auto px-8 py-16">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-white tracking-tight">NEW ARRIVALS</h2>
                    <div className="h-px bg-white/10 flex-grow ml-8"></div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full py-24 flex flex-col items-center justify-center glass-panel rounded-3xl">
                        <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-slate-400 text-lg">No products available at the moment.</p>
                        <p className="text-slate-500 text-sm mt-2">Please ensure the backend is running and the database is seeded.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
