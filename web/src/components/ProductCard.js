'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to the product page when clicking the button
        addToCart(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    // Fallback image in case the database doesn't have one
    const imageSrc = product?.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000';

    return (
        <Link href={`/product/${product.id}`} className="group block h-full">
            <div className="glass-panel hover-glow rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col bg-opacity-50">
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
                    <Image
                        src={imageSrc}
                        alt={product.name || 'Product Image'}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                            {product.category || 'Collection'}
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                            {product.name}
                        </h3>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-xl font-light text-slate-300 tracking-wide">
                            ${(product.price || 0).toFixed(2)}
                        </p>
                        <button 
                            onClick={handleAddToCart}
                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                                isAdded 
                                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                                : 'bg-white/10 text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                            }`}
                            aria-label="Add to cart"
                        >
                            {isAdded ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
