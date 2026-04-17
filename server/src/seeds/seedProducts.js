const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const INITIAL_PRODUCTS = [
  {
    name: "Minimalist Chronograph Watch",
    description: "A sleek, premium time-piece crafted from surgical-grade stainless steel with a sapphire crystal face.",
    price: 195.00,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    name: "Acoustic Over-Ear Headphones",
    description: "Immerse yourself in high-fidelity sound. Features active noise cancellation and memory foam ear cups for all-day comfort.",
    price: 349.99,
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    name: "Handcrafted Leather Messenger",
    description: "Full-grain Italian leather briefcase built to withstand the modern commute while turning heads.",
    price: 245.00,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    category: "Bags"
  },
  {
    name: "Geometric Smart Planter",
    description: "An elegant, self-watering ceramic planter designed for modern interiors. Perfect for your favorite succulents.",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000&auto=format&fit=crop",
    category: "Home Goods"
  },
  {
    name: "Artisan Wood Coffee Table",
    description: "Solid walnut construction with architectural lines. The perfect centerpiece for any minimalist living room.",
    price: 890.00,
    imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop",
    category: "Furniture"
  },
  {
    name: "Matte Black Fountain Pen",
    description: "Engineered for the smoothest writing experience. Featuring a 14k gold nib coated in matte ruthenium.",
    price: 120.00,
    imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=1000&auto=format&fit=crop",
    category: "Stationery"
  }
];

async function main() {
  console.log(`Start seeding products...`);
  
  // Clear any existing products to prevent duplicates during multiple test runs
  await prisma.product.deleteMany({});
  console.log('Cleared existing products.');

  for (const productData of INITIAL_PRODUCTS) {
    const product = await prisma.product.create({
      data: productData,
    });
    console.log(`Created product: ${product.name} (ID: ${product.id})`);
  }
  
  console.log(`Seeding finished successfully.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
