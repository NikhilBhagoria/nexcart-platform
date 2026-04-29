import Image from 'next/image';
import Link from 'next/link';
import { getProductById } from '@/services/productService';
import AddToCartDetailBtn from './AddToCartDetailBtn';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }) {
    // Await params specifically required for dynamic routes in Next.js 15+
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    // Fetch product data from our Node.js API
    const product = await getProductById(id);

    // If product doesn't exist or API is offline, trigger 404
    if (!product) {
        notFound();
    }

    const imageSrc = product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000';

    return (
        <main className="min-h-screen pt-32 pb-24 px-8 max-w-7xl mx-auto flex-grow w-full">
            {/* Breadcrumb */}
            <div className="mb-12">
                <Link href="/" className="text-slate-500 hover:text-white transition-colors text-sm uppercase tracking-widest">
                    ← Back to Collection
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Image Gallery */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden glass-panel">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                    <span className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-4">
                        {product.category || 'Premium Collection'}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-light text-slate-300 mb-10 tracking-wide">
                        ${(product.price || 0).toFixed(2)}
                    </p>
                    
                    <div className="h-px w-full bg-white/10 mb-10"></div>
                    
                    <p className="text-slate-400 text-lg leading-relaxed mb-12">
                        {product.description}
                    </p>

                    <AddToCartDetailBtn product={product} />

                    {/* Specifications List (Mock) */}
                    <div className="mt-16 space-y-4">
                        <div className="flex justify-between py-4 border-b border-white/5">
                            <span className="text-slate-500">Shipping</span>
                            <span className="text-slate-300">Complimentary Global</span>
                        </div>
                        <div className="flex justify-between py-4 border-b border-white/5">
                            <span className="text-slate-500">Returns</span>
                            <span className="text-slate-300">30-Day Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
