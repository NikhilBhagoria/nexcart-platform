const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all products from the database
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Return standard success response matching the frontend useApi expectations
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error. Failed to fetch products." });
  }
};

// Fetch a single product by its ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Return standard success response matching the frontend useApi expectations
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "Server Error. Failed to fetch product details." });
  }
};
