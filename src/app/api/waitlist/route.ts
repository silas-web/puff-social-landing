import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

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

        const normalizedEmail = email.toLowerCase().trim();

        // Check if email already exists
        const existingSnapshot = await db
            .collection("waitlist")
            .where("email", "==", normalizedEmail)
            .limit(1)
            .get();

        if (!existingSnapshot.empty) {
            return NextResponse.json(
                { message: "You're already on the waitlist! We'll be in touch soon." },
                { status: 200 }
            );
        }

        // Save to Firestore waitlist collection (the master list)
        await db.collection("waitlist").add({
            email: normalizedEmail,
            signedUpAt: new Date().toISOString(),
            source: "landing-page",
        });

        // Save to 'mail' collection to trigger the Firebase Email Extension
        await db.collection("mail").add({
            to: normalizedEmail,
            message: {
                subject: "Welcome to the Puff Social Waitlist!",
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e8f5e9; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #388e3c; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Puff Social</h1>
            </div>
            <div style="padding: 30px; line-height: 1.6; color: #333;">
              <p>Hi there,</p>
              <p>Thanks for joining the waitlist for <strong>Puff Social</strong>! We're building a space where cannabis culture meets real connection, and we're stoked to have you with us from the start.</p>
              <p>We'll keep you posted on our progress and let you know as soon as early access is available in your area.</p>
              <p>Stay lifted,<br>The Puff Social Team</p>
            </div>
            <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #666;">
              &copy; ${new Date().getFullYear()} Puff Social. All rights reserved.<br>
              Contact us at <a href="mailto:contact@puffsocialapp.com" style="color: #388e3c;">contact@puffsocialapp.com</a>
            </div>
          </div>
        `,
            },
        });

        return NextResponse.json(
            { message: "You're on the list! We'll be in touch soon." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Waitlist signup error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
