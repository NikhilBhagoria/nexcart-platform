const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        // Depending on how authMiddleware structured the token, it could be req.user.id or req.user.userId
        const userId = req.user.id || req.user.userId;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items in order' });
        }

        const order = await prisma.order.create({
            data: {
                userId,
                totalAmount,
                status: 'COMPLETED',
                items: {
                    create: items.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                items: true
            }
        });

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Server error creating order' });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id || req.user.userId;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server error fetching orders' });
    }
};

module.exports = { createOrder, getUserOrders };
