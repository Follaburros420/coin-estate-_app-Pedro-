const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe
const { formatAmountForStripe } = require('@/utils/stripe-helpers');
const { CURRENCY } = require('@/config');

async function createPaymentIntent(data) {
  try {
    const amount = formatAmountForStripe(Number(data.get("customDonation")), CURRENCY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

    return { client_secret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
}

module.exports = { createPaymentIntent };
