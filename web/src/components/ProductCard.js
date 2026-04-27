'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        // Stop event bubbling so clicking the button doesn't navigate to the product page
        e.preventDefault(); 
        e.stopPropagation();
        
        addToCart(product);
    };

    return (
        <Link 
            href={`/product/${product.id}`} 
            className="group relative block rounded-2xl glass-panel overflow-hidden transition-all duration-500 hover:-translate-y-2 hover-glow flex flex-col h-full cursor-pointer"
        >
            {/* Image Container with Zoom effect */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent opacity-80" />
                
                {/* Category Badge overlay */}
                {product.category && (
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-300 border border-white/10 uppercase tracking-[0.2em]">
                        {product.category}
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow relative z-10 bg-[#090a0f]/80 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 transition-colors group-hover:text-blue-400">
                    {product.name}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-8 flex-grow leading-relaxed">
                    {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-medium text-white tracking-tight">
                        ${product.price.toFixed(2)}
                    </span>
                    
                    <button 
                        onClick={handleAddToCart}
                        className="bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white p-3 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-500 hover:scale-110 shadow-lg"
                        aria-label="Add to cart"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </Link>
    );
}
