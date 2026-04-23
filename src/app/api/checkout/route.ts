import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, size } = body;

    if (!productId || !size) {
      return NextResponse.json(
        { error: "Product ID and size are required." },
        { status: 400 }
      );
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const origin = req.headers.get("origin") || "http://localhost:9002";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${product.name} — Size ${size}`,
              description: product.description,
              images: [`${origin}${product.images.mockup}`],
              metadata: {
                strain: product.strain,
                size: size,
                product_id: product.id,
              },
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/${product.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
