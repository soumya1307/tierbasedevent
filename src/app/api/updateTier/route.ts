import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";


export async function POST(req: Request) {
  const { userId } = await auth();
  const { tier } = await req.json();

  if (!userId || !tier) {
    return NextResponse.json({ error: "Missing user or tier" }, { status: 400 });
  }

  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { tier },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update metadata:", err);
    return NextResponse.json({ error: "Failed to update metadata" }, { status: 500 });
  }
}