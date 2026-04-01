import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Ethereal</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover curated collections of unique products.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          Shop Now
        </button>
      </div>
    </main>
  );
}
