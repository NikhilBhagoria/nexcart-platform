'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useOrderService } from '@/services/orderService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { fetchUserOrders, loading } = useOrderService();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const loadOrders = async () => {
            const { success, data } = await fetchUserOrders();
            if (success) {
                setOrders(data || []);
            }
            setIsFetching(false);
        };

        loadOrders();
    }, [user, router]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (
        <main className="min-h-screen pt-32 pb-24 px-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">My Profile</h1>
                    <p className="text-slate-400 text-lg">Welcome back, <span className="text-white font-medium">{user.name || user.email}</span></p>
                </div>
                <button 
                    onClick={() => {
                        logout();
                        router.push('/login');
                    }}
                    className="px-6 py-2.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-slate-300 hover:text-red-400 font-bold uppercase tracking-widest text-xs rounded-full transition-all"
                >
                    Sign Out
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Account Details Panel */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-8 rounded-3xl sticky top-32">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                            Account Details
                        </h2>
                        
                        <div className="space-y-6">
                            <div>
                                <span className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Email</span>
                                <span className="text-slate-300">{user.email}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Member Since</span>
                                <span className="text-slate-300">May 2026</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Status</span>
                                <span className="text-green-400 font-medium bg-green-400/10 px-3 py-1 rounded-full text-sm">Active Curator</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order History */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Order History</h2>
                    
                    {isFetching || loading ? (
                        <div className="glass-panel p-12 rounded-3xl flex flex-col items-center justify-center text-center">
                            <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-slate-400">Loading your archives...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="glass-panel p-12 rounded-3xl flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No past orders</h3>
                            <p className="text-slate-400 mb-8">You haven't curated any pieces for your collection yet.</p>
                            <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-500 transition-colors">
                                Explore Collection
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="glass-panel p-6 sm:p-8 rounded-3xl transition-all hover:bg-white/[0.03]">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-white/10 gap-4">
                                        <div>
                                            <span className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Order Date</span>
                                            <span className="text-slate-300 font-medium">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <div className="sm:text-right">
                                            <span className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Total</span>
                                            <span className="text-2xl font-light text-white">${order.totalAmount?.toFixed(2)}</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                                            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">{order.status}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {order.items?.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center bg-black/20 p-4 rounded-2xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden relative">
                                                        {item.product?.imageUrl ? (
                                                            <img src={item.product.imageUrl} alt={item.product.name} className="object-cover w-full h-full" />
                                                        ) : (
                                                            <div className="w-full h-full bg-slate-800"></div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-medium">{item.product?.name || 'Archived Item'}</h4>
                                                        <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="text-slate-300">${item.price?.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
