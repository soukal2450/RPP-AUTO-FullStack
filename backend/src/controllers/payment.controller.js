const { PrismaClient } = require('@prisma/client');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const userId = req.user.userId;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: { orderId, userId }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;
    const userId = req.user.userId;

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Record payment in database
      const payment = await prisma.payment.create({
        data: {
          userId,
          orderId,
          stripePaymentId: paymentIntentId,
          amount: paymentIntent.amount / 100,
          status: 'succeeded',
          method: 'card'
        }
      });

      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'paid' }
      });

      res.json({ message: 'Payment confirmed', payment });
    } else {
      res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const payments = await prisma.payment.findMany({
      where: { userId },
      include: { order: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ payments });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
