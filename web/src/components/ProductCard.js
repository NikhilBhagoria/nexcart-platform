'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to the product page when clicking the button
        addToCart(product);
    };

    return (
        <Link 
            href={`/product/${product.id}`} 
            className="group relative glass-panel rounded-2xl overflow-hidden flex flex-col hover-glow transition-all duration-300 transform hover:-translate-y-1"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0B0E14]">
                {product.imageUrl ? (
                    <Image 
                        src={product.imageUrl} 
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 bg-black/50">
                        No Image
                    </div>
                )}
                {/* Category Badge */}
                {product.category && (
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider text-white font-semibold rounded-full border border-white/10 shadow-lg">
                        {product.category}
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow justify-between bg-gradient-to-t from-black/80 to-transparent">
                <div>
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-white tracking-wide">${product.price.toFixed(2)}</span>
                    <button 
                        onClick={handleAddToCart}
                        className="bg-white/10 hover:bg-blue-600 border border-white/20 text-white rounded-full p-2.5 transition-all duration-300 group-hover:scale-110 shadow-lg"
                        aria-label="Add to cart"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </Link>
    );
}
