// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   let event;

//   try {
//     const payload = await req.text(); // Read raw request body as text
//     const sig = req.headers.get("stripe-signature");

//     // Verify the webhook signature
//     event = stripe.webhooks.constructEvent(
//       payload,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     const errorMessage = err instanceof Error ? err.message : "Unknown error";
//     console.error(`❌ Webhook signature verification failed: ${errorMessage}`);
//     return NextResponse.json(
//       { message: `Webhook Error: ${errorMessage}` },
//       { status: 400 }
//     );
//   }

//   // Log success
//   console.log("✅ Success:", event.id);

//   // Handle the event
//   const permittedEvents = [
//     "checkout.session.completed",
//     "payment_intent.succeeded",
//     "payment_intent.payment_failed",
//   ];

//   if (permittedEvents.includes(event.type)) {
//     const data = event.data.object;

//     try {
//       switch (event.type) {
//         case "checkout.session.completed":
//           console.log(`💰 CheckoutSession completed with status: ${data.payment_status}`);
//           // Handle session completed logic here (e.g., save to DB)
//           break;
//         case "payment_intent.succeeded":
//           console.log(`💰 PaymentIntent succeeded with status: ${data.status}`);
//           // Handle successful payment logic here
//           break;
//         case "payment_intent.payment_failed":
//           console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
//           // Handle payment failure logic here
//           break;
//         default:
//           console.warn(`Unhandled event type: ${event.type}`);
//       }
//     } catch (error) {
//       console.error("Error handling event:", error);
//       return NextResponse.json(
//         { message: "Webhook handler failed" },
//         { status: 500 }
//       );
//     }
//   }

//   // Return a response to acknowledge receipt of the event
//   return NextResponse.json({ message: "Event received" }, { status: 200 });
// }

import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Validate the Bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Missing or invalid token." });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.userId) {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }

      const data = req.body; // Access data from the request body

      // Ensure required fields are provided
      if (!data.amount || typeof data.amount !== "number") {
        return res
          .status(400)
          .json({ error: "Amount is required and must be a valid number." });
      }

      // Create a PaymentIntent using Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      // Optionally, store payment intent details in the database
      const paymentRecord = await prisma.payment.create({
        data: {
          userId: decoded.userId,
          amount: data.amount,
          currency: "usd",
          paymentIntentId: paymentIntent.id,
          status: "PENDING", // Update this based on webhook events if needed
        },
      });

      // Respond with the client secret for the PaymentIntent
      res.status(201).json({
        message: "PaymentIntent created successfully.",
        clientSecret: paymentIntent.client_secret,
        payment: paymentRecord,
      });
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);

      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Unauthorized. Token has expired." });
      }

      // Handle Stripe or general errors
      res.status(500).json({
        error: "Failed to create PaymentIntent. Please try again later.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
