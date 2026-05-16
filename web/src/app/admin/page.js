'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useAdminService } from '@/services/adminService';
import { getAllProducts } from '@/services/productService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AdminDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const { createProduct, deleteProduct, loading } = useAdminService();
    
    const [products, setProducts] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: ''
    });

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        fetchProducts();
    }, [user, router]);

    const fetchProducts = async () => {
        setIsFetching(true);
        try {
            const data = await getAllProducts();
            setProducts(data || []);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
        setIsFetching(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const { success } = await createProduct({
            ...formData,
            price: parseFloat(formData.price)
        });
        
        if (success) {
            setFormData({ name: '', description: '', price: '', imageUrl: '', category: '' });
            fetchProducts(); // Refresh list
        } else {
            alert('Failed to create product. Please ensure you have ADMIN privileges.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanently delete this curated item?")) {
            const { success } = await deleteProduct(id);
            if (success) {
                fetchProducts();
            } else {
                alert('Failed to delete product. Please ensure you have ADMIN privileges.');
            }
        }
    };

    if (!user) return null;

    return (
        <main className="min-h-screen pt-32 pb-24 px-8 max-w-7xl mx-auto w-full">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">Curator Dashboard</h1>
                <p className="text-slate-400 text-lg">Manage your exclusive collection, <span className="text-white font-medium">{user.name || user.email}</span>.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Product Creation Form */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-8 rounded-3xl sticky top-32">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                            Add New Piece
                        </h2>
                        
                        <form onSubmit={handleCreate} className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">Item Name</label>
                                <input required name="name" value={formData.name} onChange={handleChange} placeholder="Obsidian Vase" className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600 text-sm" />
                            </div>
                            
                            <div>
                                <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="A stunning piece of modern..." rows="3" className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600 text-sm resize-none"></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">Price ($)</label>
                                    <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="299.99" className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">Category</label>
                                    <input required name="category" value={formData.category} onChange={handleChange} placeholder="Decor" className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600 text-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">Image URL</label>
                                <input required name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://images.unsplash.com/..." className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600 text-sm" />
                            </div>

                            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg py-3 transition-all mt-4 hover-glow shadow-lg shadow-blue-900/20 disabled:opacity-50 text-sm uppercase tracking-widest">
                                {loading ? "Curating..." : "Publish to Gallery"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Product Inventory List */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Active Inventory</h2>
                    
                    {isFetching ? (
                        <div className="glass-panel p-12 rounded-3xl flex flex-col items-center justify-center text-center">
                            <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-slate-400">Loading catalog...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="glass-panel p-12 rounded-3xl text-center text-slate-400">
                            Your gallery is completely empty. Add your first piece.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div key={product.id} className="glass-panel p-4 rounded-2xl flex items-center gap-6 group hover:bg-white/[0.03] transition-colors">
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/20 flex-shrink-0">
                                        <Image
                                            src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000'}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                    
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-white font-bold">{product.name}</h3>
                                            <p className="text-xs text-slate-500 uppercase tracking-widest">{product.category}</p>
                                        </div>
                                        <p className="text-lg font-light text-slate-300">${(product.price || 0).toFixed(2)}</p>
                                    </div>
                                    
                                    <div>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-500 hover:text-red-400 p-2 opacity-50 group-hover:opacity-100 transition-all hover:scale-110"
                                            title="Delete Item"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
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
