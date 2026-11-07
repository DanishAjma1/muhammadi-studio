import { NextResponse } from "next/server";
import { sendBookingNotification } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      bookingId,
      serviceName,
      price,
      barberName,
      date,
      time,
      durationMin,
      clientName,
      clientPhone,
      clientEmail,
      notes,
    } = body;

    if (!bookingId || !serviceName || !date || !time || !clientName || !clientPhone) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details." },
        { status: 400 }
      );
    }

    const result = await sendBookingNotification({
      bookingId: String(bookingId),
      serviceName: String(serviceName),
      price: Number(price) || 0,
      barberName: String(barberName || "Muhammadi Studio Director"),
      date: String(date),
      time: String(time),
      durationMin: Number(durationMin) || 60,
      clientName: String(clientName),
      clientPhone: String(clientPhone),
      clientEmail: clientEmail ? String(clientEmail).trim() : undefined,
      notes: notes ? String(notes).trim() : undefined,
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
