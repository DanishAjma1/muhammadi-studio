import { NextResponse } from "next/server";
import { sendBookingNotification } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      bookingId,
      serviceName,
      functions,
      price,
      barberName,
      date,
      time,
      durationMin,
      clientName,
      clientPhone,
      clientEmail,
      venue,
      notes,
    } = body;

    const resolvedService =
      serviceName || (Array.isArray(functions) && functions.length > 0 ? functions.join(" + ") : "Complete Event Arrangement");

    if (!bookingId || !date || !time || !clientName || !clientPhone) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details (Date, Time, Name, or Phone)." },
        { status: 400 }
      );
    }

    const combinedNotes = [
      venue ? `Venue / Location: ${venue}` : "",
      Array.isArray(functions) && functions.length > 0 ? `Selected Functions: ${functions.join(", ")}` : "",
      notes || "",
    ]
      .filter(Boolean)
      .join("\n");

    const result = await sendBookingNotification({
      bookingId: String(bookingId),
      serviceName: String(resolvedService),
      price: Number(price) || 0,
      barberName: String(barberName || "Atiq Butt (Owner & Event Director)"),
      date: String(date),
      time: String(time),
      durationMin: Number(durationMin) || 180,
      clientName: String(clientName),
      clientPhone: String(clientPhone),
      clientEmail: clientEmail ? String(clientEmail).trim() : undefined,
      notes: combinedNotes ? String(combinedNotes).trim() : undefined,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to process booking notification";
    console.error("API /api/booking error:", error);
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
