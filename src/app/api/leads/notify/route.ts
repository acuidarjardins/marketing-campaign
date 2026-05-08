import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotification } from "@/utils/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await sendLeadNotification(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[notify] Email send failed:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
