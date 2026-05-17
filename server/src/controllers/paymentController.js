const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        const { items } = req.body;
        
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items in order' });
        }

        // Map cart items to Stripe's line_items format
        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: item.imageUrl ? [item.imageUrl] : [],
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
            },
            quantity: item.quantity,
        }));

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            // Replace with actual production URLs when deploying
            success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/cart?success=true`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/cart?canceled=true`,
            customer_email: req.user?.email || undefined,
        });

        res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ success: false, message: 'Server error processing payment' });
    }
};

module.exports = { createCheckoutSession };
