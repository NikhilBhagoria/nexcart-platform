const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authorized, no user session' });
        }

        const userId = req.user.id || req.user.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Not authorized, invalid token payload' });
        }

        // Fetch the fresh user state from the database to securely check the role
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (user && user.role === 'ADMIN') {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'Forbidden: You do not have administrator privileges.' });
        }
    } catch (error) {
        console.error('Admin middleware error:', error);
        res.status(500).json({ success: false, message: 'Server error during admin authorization' });
    }
};

module.exports = adminMiddleware;
