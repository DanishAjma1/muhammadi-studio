import { NextResponse } from "next/server";
import { sendBookingApprovalConfirmation } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      bookingId,
      clientName,
      clientEmail,
      clientPhone,
      functions,
      date,
      time,
      venue,
      adminNotes,
    } = body;

    if (!bookingId || !clientName || !clientEmail) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details (ID, client name, or email)." },
        { status: 400 }
      );
    }

    const result = await sendBookingApprovalConfirmation({
      bookingId: String(bookingId),
      clientName: String(clientName),
      clientEmail: String(clientEmail).trim(),
      clientPhone: String(clientPhone || "0313-7526305"),
      functions: Array.isArray(functions) && functions.length > 0 ? functions : ["Complete Event Arrangement"],
      date: String(date || "Scheduled Date"),
      time: String(time || "Agreed Time"),
      venue: venue ? String(venue).trim() : undefined,
      adminNotes: adminNotes ? String(adminNotes).trim() : undefined,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to process booking approval";
    console.error("API /api/booking/approve error:", error);
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
