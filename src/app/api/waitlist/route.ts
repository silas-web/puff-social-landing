import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

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
            createdAt: FieldValue.serverTimestamp(),
            source: "landing-page",
        });

        // Save to 'mail' collection to trigger the Firebase Email Extension
        await db.collection("mail").add({
            to: normalizedEmail,
            message: {
                subject: "🌿 You're In! Welcome to the Puff Social Waitlist",
                html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header with logo -->
            <div style="background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%); padding: 40px 30px; text-align: center; border-radius: 0 0 30px 30px;">
              <img src="https://puffsocialapp.com/Puff_Social_Full%20Color_Shadow.png" alt="Puff Social" width="120" style="margin-bottom: 16px;" />
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Welcome to the Family 🌿</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 15px;">You're officially on the waitlist</p>
            </div>

            <!-- Main content -->
            <div style="padding: 36px 30px 20px; line-height: 1.7; color: #333;">
              <p style="font-size: 16px; margin: 0 0 16px;">Hey there! 👋</p>
              <p style="font-size: 15px; margin: 0 0 16px; color: #444;">
                Thanks for signing up for <strong style="color: #2E7D32;">Puff Social</strong> — the social and dating app built for the cannabis community. We're creating a space where you can be yourself, find your people, and explore the culture.
              </p>
              <p style="font-size: 15px; margin: 0 0 24px; color: #444;">
                You're one of the first to join, and we'll make sure you get <strong>early access</strong> before anyone else.
              </p>

              <!-- Feature cards -->
              <div style="background: #F1F8E9; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                <p style="font-size: 14px; font-weight: 700; color: #2E7D32; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">What's Coming</p>
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding: 8px 0; vertical-align: top; width: 36px;">
                      <span style="font-size: 22px;">🔥</span>
                    </td>
                    <td style="padding: 8px 0; vertical-align: top;">
                      <strong style="color: #333; font-size: 14px;">Match</strong>
                      <span style="color: #666; font-size: 14px;"> — Find like-minded people who share your lifestyle</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; vertical-align: top; width: 36px;">
                      <span style="font-size: 22px;">📍</span>
                    </td>
                    <td style="padding: 8px 0; vertical-align: top;">
                      <strong style="color: #333; font-size: 14px;">Discover</strong>
                      <span style="color: #666; font-size: 14px;"> — Explore dispensaries with real community reviews</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; vertical-align: top; width: 36px;">
                      <span style="font-size: 22px;">💬</span>
                    </td>
                    <td style="padding: 8px 0; vertical-align: top;">
                      <strong style="color: #333; font-size: 14px;">Connect</strong>
                      <span style="color: #666; font-size: 14px;"> — Cannabis news, culture, and community in one place</span>
                    </td>
                  </tr>
                </table>
              </div>


              <p style="font-size: 15px; margin: 24px 0 0; color: #444;">
                Stay lifted,<br>
                <strong style="color: #2E7D32;">The Puff Social Team</strong> 🌿
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #F5F5F5; padding: 24px 30px; text-align: center; border-top: 1px solid #E8E8E8;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #888;">
                Follow us as we build something special for the community.
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
