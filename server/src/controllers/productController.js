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

// Create a new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category } = req.body;
    
    // Basic validation
    if (!name || !description || price === undefined || !imageUrl || !category) {
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category
      }
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Server Error. Failed to create product." });
  }
};

// Update an existing product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, imageUrl, category } = req.body;

    // Check if product exists first
    const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price !== undefined ? parseFloat(price) : existingProduct.price,
        imageUrl: imageUrl || existingProduct.imageUrl,
        category: category || existingProduct.category
      }
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(`Error updating product with ID ${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "Server Error. Failed to update product." });
  }
};

// Delete a product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists first
    const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    await prisma.product.delete({
      where: { id: productId }
    });

    res.status(200).json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    console.error(`Error deleting product with ID ${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "Server Error. Failed to delete product." });
  }
};
