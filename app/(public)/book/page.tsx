import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader } from "@/components/core";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Choose a service, pick your barber and grab a time — booked in under a minute.",
};

export default function BookPage() {
  return (
    <Suspense fallback={<div className="pt-40"><Loader label="Loading booking…" /></div>}>
      <BookingWizard />
    </Suspense>
  );
}
