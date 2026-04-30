'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart, isInitialized } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Prevent hydration mismatch between server HTML and local storage injection
    if (!isInitialized) return null; 

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate a network request for payment gateway and checkout pipeline
        setTimeout(() => {
            setIsCheckingOut(false);
            setOrderComplete(true);
            clearCart();
        }, 2000);
    };

    if (orderComplete) {
        return (
            <main className="min-h-screen pt-40 pb-24 px-8 max-w-3xl mx-auto flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-8 border border-green-500/30">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Order Confirmed</h1>
                <p className="text-slate-400 text-lg mb-12">
                    Thank you for shopping at Ethereal. Your premium items will be dispatched to you shortly.
                </p>
                <Link href="/" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-slate-200 transition-colors">
                    Continue Shopping
                </Link>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen pt-40 pb-24 px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">Your Cart Is Empty</h1>
                <p className="text-slate-400 text-lg mb-12 max-w-md">
                    Looks like you haven't added anything to your cart yet. Discover our latest collections.
                </p>
                <Link href="/" className="px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    Explore Collection
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-8 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-black text-white mb-12 tracking-tighter uppercase">Shopping Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-black/20 flex-shrink-0">
                                <Image
                                    src={item.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000'}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            
                            <div className="flex-grow flex flex-col justify-between h-full w-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white leading-tight">{item.name}</h3>
                                        <p className="text-sm text-slate-500 uppercase tracking-widest mt-1">{item.category}</p>
                                    </div>
                                    <p className="text-xl font-light text-slate-300">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                
                                <div className="flex justify-between items-center mt-auto">
                                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                            className="text-slate-400 hover:text-white px-2"
                                        >
                                            -
                                        </button>
                                        <span className="text-white text-sm w-4 text-center font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                            className="text-slate-400 hover:text-white px-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)} 
                                        className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Checkout Panel */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-8 rounded-3xl sticky top-32">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                            Order Summary
                        </h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-slate-400">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Estimated Shipping</span>
                                <span className="text-green-400 font-medium">Complimentary</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Taxes</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>
                        
                        <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                            <span className="text-white font-bold uppercase tracking-widest">Total</span>
                            <span className="text-3xl font-light text-white">${cartTotal.toFixed(2)}</span>
                        </div>
                        
                        <button 
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all flex justify-center items-center ${
                                isCheckingOut 
                                ? 'bg-blue-600/50 text-white cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                            }`}
                        >
                            {isCheckingOut ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Checkout'}
                        </button>
                        
                        <p className="text-xs text-slate-500 text-center mt-6">
                            Secure encrypted checkout. Ethereal Boutique.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
