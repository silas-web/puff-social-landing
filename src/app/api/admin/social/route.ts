import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";

async function verifyAdmin(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;

  try {
    const token = authHeader.split("Bearer ")[1];
    const decoded = await getAuth().verifyIdToken(token);
    return decoded.email?.endsWith("@puffsocialapp.com") ?? false;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { authorUsername, text, url } = await request.json();

    if (!authorUsername?.trim() || !text?.trim()) {
      return NextResponse.json(
        { error: "Author handle and post text are required." },
        { status: 400 }
      );
    }

    const handle = authorUsername.trim().replace("@", "");

    await db.collection("social_posts").add({
      text: text.trim(),
      authorName: handle,
      authorUsername: handle,
      authorAvatar: "",
      url: url?.trim() || `https://x.com/${handle}`,
      likes: 0,
      retweets: 0,
      replies: 0,
      createdAt: FieldValue.serverTimestamp(),
      addedBy: "admin (landing)",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error adding social post:", error);
    return NextResponse.json(
      { error: "Failed to add social post." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required." },
        { status: 400 }
      );
    }

    await db.collection("social_posts").doc(postId).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting social post:", error);
    return NextResponse.json(
      { error: "Failed to delete social post." },
      { status: 500 }
    );
  }
}
