import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const result = await sendContactNotification({
      name: String(name).trim(),
      email: String(email).trim(),
      topic: topic ? String(topic).trim() : undefined,
      message: String(message).trim(),
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to process contact submission";
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
