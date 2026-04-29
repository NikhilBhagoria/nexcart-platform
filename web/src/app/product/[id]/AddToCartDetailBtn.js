'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function AddToCartDetailBtn({ product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-6">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between glass-panel px-4 py-2 rounded-full w-full sm:w-32 h-14">
                <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-slate-400 hover:text-white px-2 text-xl"
                >
                    -
                </button>
                <span className="text-white font-medium">{quantity}</span>
                <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-slate-400 hover:text-white px-2 text-xl"
                >
                    +
                </button>
            </div>

            {/* Add to Cart Button */}
            <button 
                onClick={handleAdd}
                className={`flex-1 h-14 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                    isAdded 
                    ? 'bg-green-500 text-white shadow-[0_0_25px_rgba(34,197,94,0.4)]'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                }`}
            >
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
        </div>
    );
}
