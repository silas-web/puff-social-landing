import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";

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

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { feedbackId, status } = await request.json();

    if (!feedbackId || !status) {
      return NextResponse.json(
        { error: "feedbackId and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "in-progress", "resolved"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be pending, in-progress, or resolved." },
        { status: 400 }
      );
    }

    await db.collection("feedback").doc(feedbackId).update({
      status,
      resolved: status === "resolved",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating feedback:", error);
    return NextResponse.json(
      { error: "Failed to update feedback status." },
      { status: 500 }
    );
  }
}
