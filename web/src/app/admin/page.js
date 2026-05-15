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
    const { createProduct, updateProduct, deleteProduct, loading: isMutating } = useAdminService();
    
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    
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
        if (user.role !== 'ADMIN') {
            router.push('/');
            return;
        }
        
        loadProducts();
    }, [user, router]); // eslint-disable-line react-hooks/exhaustive-deps

    const loadProducts = async () => {
        setIsLoading(true);
        // Force fresh fetch on the client if possible
        const data = await getAllProducts();
        setProducts(data || []);
        setIsLoading(false);
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl,
                category: product.category
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                imageUrl: '',
                category: ''
            });
        }
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this piece?")) {
            const { success } = await deleteProduct(id);
            if (success) {
                // Remove instantly from UI to avoid waiting for cache invalidation
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert("Failed to delete product.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            ...formData,
            price: parseFloat(formData.price)
        };

        let response;
        if (editingProduct) {
            response = await updateProduct(editingProduct.id, payload);
        } else {
            response = await createProduct(payload);
        }

        if (response.success) {
            setShowModal(false);
            loadProducts(); // Reload to get fresh data
        } else {
            alert(response.error || "Failed to save product.");
        }
    };

    if (!user || user.role !== 'ADMIN') return null;

    return (
        <main className="min-h-screen pt-32 pb-24 px-8 max-w-7xl mx-auto w-full font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Curator Dashboard</h1>
                    <p className="text-slate-400 mt-2">Manage the Ethereal Boutique collection.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover-glow"
                >
                    + Add New Piece
                </button>
            </div>

            {/* Products Table */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-xs font-bold tracking-widest text-slate-400 uppercase">
                                <th className="p-6">Piece</th>
                                <th className="p-6">Category</th>
                                <th className="p-6">Price</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-slate-400">Loading collection...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-slate-400">No pieces found in the collection.</td>
                                </tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black/20 flex-shrink-0 border border-white/5">
                                                    <Image 
                                                        src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000'}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="48px"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">{product.name}</p>
                                                    <p className="text-slate-500 text-xs truncate max-w-[200px]">{product.id.substring(0,8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-bold tracking-widest text-slate-300 uppercase">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="p-6 text-slate-300 font-light">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="p-6 text-right">
                                            <button 
                                                onClick={() => handleOpenModal(product)}
                                                className="text-blue-400 hover:text-blue-300 font-semibold uppercase tracking-widest text-xs mr-4 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:text-red-400 font-semibold uppercase tracking-widest text-xs transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-[#090a0f]/90 backdrop-blur-sm" onClick={() => !isMutating && setShowModal(false)}></div>
                    <div className="relative glass-panel border border-white/10 w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                                {editingProduct ? 'Edit Piece' : 'Add New Piece'}
                            </h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-slate-500 hover:text-white transition-colors p-2"
                                disabled={isMutating}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Piece Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="The Obsidian Watch"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Category</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="Accessories"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Price ($)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        required 
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="299.99"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Image URL (Unsplash)</label>
                                    <input 
                                        type="url" 
                                        required 
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Description</label>
                                    <textarea 
                                        required 
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 text-white rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-600 h-32 resize-none"
                                        placeholder="A detailed description of the piece..."
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-4 border-t border-white/10">
                                <button 
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 text-slate-400 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors"
                                    disabled={isMutating}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isMutating}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all disabled:opacity-50 hover-glow shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                                >
                                    {isMutating ? 'Saving...' : 'Save Piece'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
