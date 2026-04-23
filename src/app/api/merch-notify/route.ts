import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { products } from "@/lib/products";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, productId } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "Product ID is required." },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if this email is already signed up for this product
    const existingSnapshot = await db
      .collection("merch_notifications")
      .where("email", "==", normalizedEmail)
      .where("productId", "==", productId)
      .limit(1)
      .get();

    if (!existingSnapshot.empty) {
      return NextResponse.json(
        { message: "You're already signed up! We'll let you know when it drops." },
        { status: 200 }
      );
    }

    // Save to merch_notifications collection
    await db.collection("merch_notifications").add({
      email: normalizedEmail,
      productId: product.id,
      productName: product.name,
      strain: product.strain,
      createdAt: FieldValue.serverTimestamp(),
      source: "product-page",
    });

    // Determine the live URL for the product mockup
    const siteUrl = "https://puffsocialapp.com";
    const mockupUrl = `${siteUrl}${product.images.mockup}`;

    // Send confirmation email via Firebase Email Extension
    await db.collection("mail").add({
      to: normalizedEmail,
      message: {
        subject: `🌿 We'll let you know when the ${product.name} drops`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, ${product.colorHex} 0%, ${product.colorHex}CC 100%); padding: 40px 30px; text-align: center; border-radius: 0 0 30px 30px;">
              <img src="https://puffsocialapp.com/Puff_Social_Full%20Color_Shadow.png" alt="Puff Social" width="100" style="margin-bottom: 16px;" />
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">You're on the list 🔔</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 15px;">We'll hit you up when it's ready</p>
            </div>

            <!-- Product showcase -->
            <div style="padding: 36px 30px 20px; text-align: center;">
              <img src="${mockupUrl}" alt="${product.name}" width="320" style="border-radius: 16px; margin-bottom: 20px; max-width: 100%;" />
              <h2 style="font-size: 22px; font-weight: 700; margin: 0 0 4px; color: #1a1a1a;">${product.name}</h2>
              <p style="font-size: 14px; color: #888; margin: 0 0 4px; font-style: italic;">${product.tagline}</p>
              <span style="display: inline-block; font-size: 12px; font-weight: 600; color: ${product.colorHex}; background: ${product.colorHex}15; padding: 4px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px;">Strain Tees Collection</span>
            </div>

            <!-- Message -->
            <div style="padding: 0 30px 30px; line-height: 1.7; color: #444;">
              <p style="font-size: 15px; margin: 0 0 16px;">Hey! 👋</p>
              <p style="font-size: 15px; margin: 0 0 16px;">
                Thanks for your interest in the <strong style="color: ${product.colorHex};">${product.name}</strong>. We're putting the finishing touches on this one — finalizing stock and getting everything just right.
              </p>
              <p style="font-size: 15px; margin: 0 0 16px;">
                As soon as it's available to cop, you'll be the first to hear from us. No spam, just a heads up when it's go time.
              </p>
              <p style="font-size: 15px; margin: 24px 0 0; color: #333;">
                Puff Socially,<br>
                <strong style="color: ${product.colorHex};">The Puff Social Team</strong> 🌿
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #F5F5F5; padding: 24px 30px; text-align: center; border-top: 1px solid #E8E8E8;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #888;">
                You're receiving this because you signed up for drop notifications.
              </p>
              <p style="margin: 0; font-size: 12px; color: #aaa;">
                &copy; ${new Date().getFullYear()} Puff Social. All rights reserved.<br>
                <a href="mailto:contact@puffsocialapp.com" style="color: #2E7D32; text-decoration: none;">contact@puffsocialapp.com</a>
                &nbsp;·&nbsp;
                <a href="https://puffsocialapp.com" style="color: #2E7D32; text-decoration: none;">puffsocialapp.com</a>
              </p>
            </div>
          </div>
        `,
      },
    });

    return NextResponse.json(
      { message: "You're on the list! We'll let you know when it drops." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Merch notification signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
