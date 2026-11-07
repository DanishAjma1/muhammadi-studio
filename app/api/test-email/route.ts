import { NextResponse } from "next/server";
import { getMailConfig, testSmtpConnection, sendContactNotification } from "@/lib/mail";

export async function GET() {
  const config = getMailConfig();
  const test = await testSmtpConnection();
  return NextResponse.json({
    configured: config.isConfigured,
    smtpHost: config.host,
    smtpPort: config.port,
    senderEmail: config.user || "(Not set - configure in .env.local)",
    recipientEmail: config.recipient,
    connectionStatus: test,
  });
}

export async function POST() {
  try {
    const config = getMailConfig();

    if (!config.isConfigured) {
      return NextResponse.json({
        success: false,
        configured: false,
        message:
          "Gmail SMTP is not configured. Please add GMAIL_USER and GMAIL_APP_PASSWORD in your .env.local file.",
      });
    }

    const result = await sendContactNotification({
      name: "Muhammadi Studio SMTP Tester",
      email: config.recipient,
      topic: "System SMTP Test Verification",
      message:
        "This is a verification test email sent through Google's SMTP servers to confirm your Muhammadi Studio notifications are working properly.",
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to send test email";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
