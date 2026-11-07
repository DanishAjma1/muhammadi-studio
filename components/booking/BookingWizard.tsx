"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarCheck, Camera, Check, Clock, Users } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Input, StarRating, TextArea, useToast } from "@/components/core";
import { useAppointments, useAvailability, useBarbers, useServices } from "@/hooks";
import { useBookingStore } from "@/store/bookingStore";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Calendar } from "./Calendar";
import { BookingStepper } from "./BookingStepper";

export function BookingWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const { activeServices } = useServices();
  const { activeBarbers, getById: getBarber } = useBarbers();
  const { addAppointment } = useAppointments();

  const {
    step, serviceId, barberId, date, time, details,
    setService, setBarber, setDate, setTime, setDetails, next, back, goTo, reset, setLastBooking,
  } = useBookingStore();

  const slots = useAvailability(date, barberId === "any" ? null : barberId);
  const service = activeServices.find((s) => s.id === serviceId);

  // Pre-select from query (?service= / ?barber=)
  useEffect(() => {
    const svc = params.get("service");
    const brb = params.get("barber");
    if (svc) setService(svc);
    if (brb) setBarber(brb);
    if (svc && brb) goTo(3);
    else if (svc) goTo(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canContinue =
    (step === 1 && !!serviceId) ||
    (step === 2 && !!barberId) ||
    (step === 3 && !!date) ||
    (step === 4 && !!time) ||
    step === 5;

  const confirm = async () => {
    if (!details.name.trim() || !details.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    if (!service || !date || !time) return;
    const assigned = barberId === "any" ? activeBarbers[0] : getBarber(barberId!);
    if (!assigned) return;

    setSubmitting(true);

    const appt = addAppointment({
      customerId: "guest",
      customerName: details.name,
      customerPhone: details.phone,
      barberId: assigned.id,
      barberName: assigned.name,
      serviceId: service.id,
      serviceName: service.name,
      date,
      time,
      durationMin: service.durationMin,
      price: service.price,
      status: "confirmed",
      notes: details.notes || undefined,
      source: "direct",
    });

    // Dispatch Gmail SMTP notification asynchronously
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: appt.id,
          serviceName: service.name,
          price: service.price,
          barberName: assigned.name,
          date,
          time,
          durationMin: service.durationMin,
          clientName: details.name,
          clientPhone: details.phone,
          clientEmail: details.email,
          notes: details.notes,
        }),
      });
    } catch (err) {
      console.warn("Background SMTP notification notice:", err);
    }

    setLastBooking(appt);
    setSubmitting(false);
    toast.success("Shoot reserved! Notification dispatched via Gmail SMTP.", "Session Confirmed");
    router.push("/book/success");
    setTimeout(() => reset(), 400);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
      <div className="mb-8 text-center">
        <p className="eyebrow mb-2">Muhammadi Studio</p>
        <h1 className="heading text-3xl text-foreground sm:text-4xl">Reserve Your Production Shoot</h1>
        <p className="mt-2 text-sm text-muted">
          Select your service package, choose your Director / Photographer, and book your session in under a minute.
        </p>
      </div>

      <div className="mb-10">
        <BookingStepper current={step} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Steps */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Step 1 — Service */}
              {step === 1 && (
                <div className="space-y-3">
                  <h2 className="heading text-xl text-foreground">Select a production package</h2>
                  {activeServices.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors",
                        serviceId === s.id ? "border-gold bg-gold/5" : "border-border hover:border-border-strong",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                          serviceId === s.id ? "border-gold bg-gold" : "border-border-strong",
                        )}
                      >
                        {serviceId === s.id && <Check className="size-3 text-black" />}
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium text-foreground">{s.name}</span>
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Clock className="size-3" /> {s.durationMin} min duration
                        </span>
                      </span>
                      <span className="heading text-lg text-gold">{formatCurrency(s.price)}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 — Director / Photographer */}
              {step === 2 && (
                <div>
                  <h2 className="heading mb-4 text-xl text-foreground">Choose your Director / Lead Artist</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <button
                      onClick={() => setBarber("any")}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors",
                        barberId === "any" ? "border-gold bg-gold/5" : "border-border hover:border-border-strong",
                      )}
                    >
                      <span className="flex size-16 items-center justify-center rounded-full bg-elevated text-muted">
                        <Users className="size-6" />
                      </span>
                      <span className="text-sm font-medium text-foreground">Any Master Artist</span>
                      <span className="text-xs text-muted">Fastest open date</span>
                    </button>
                    {activeBarbers.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBarber(b.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors",
                          barberId === b.id ? "border-gold bg-gold/5" : "border-border hover:border-border-strong",
                        )}
                      >
                        <div className="relative size-16 overflow-hidden rounded-full">
                          <Image src={b.avatar} alt={b.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{b.name}</span>
                        <span className="text-xs text-gold/80">{b.id === "brb_attiq" ? "Co-Founder" : b.id === "brb_usman" ? "Founder" : "Lead Specialist"}</span>
                        <StarRating rating={b.rating} size={12} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Date */}
              {step === 3 && (
                <div>
                  <h2 className="heading mb-4 text-xl text-foreground">Select a date for the shoot</h2>
                  <Calendar value={date} onChange={setDate} />
                </div>
              )}

              {/* Step 4 — Time */}
              {step === 4 && (
                <div>
                  <h2 className="heading mb-1 text-xl text-foreground">Available Call Times</h2>
                  <p className="mb-4 text-sm text-muted">{date && formatDate(date, "weekday")}</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setTime(slot.time)}
                        className={cn(
                          "rounded-xl border py-2.5 text-sm transition-colors",
                          time === slot.time
                            ? "border-gold bg-gold text-black"
                            : slot.available
                              ? "border-border text-foreground hover:border-gold/50"
                              : "cursor-not-allowed border-border/50 text-faint/40 line-through",
                        )}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 — Details */}
              {step === 5 && (
                <div className="space-y-4">
                  <h2 className="heading text-xl text-foreground">Your contact & shoot details</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Full name"
                      placeholder="e.g. Sarah Khan"
                      value={details.name}
                      onChange={(e) => setDetails({ name: e.target.value })}
                    />
                    <Input
                      label="Phone / WhatsApp"
                      placeholder="+1 (555) 000-0000"
                      value={details.phone}
                      onChange={(e) => setDetails({ phone: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Email address (for booking & contract delivery)"
                    type="email"
                    placeholder="sarah@example.com"
                    value={details.email}
                    onChange={(e) => setDetails({ email: e.target.value })}
                  />
                  <TextArea
                    label="Shoot Vision / Venue / Notes (optional)"
                    placeholder="Share any special instructions, venue locations, or aesthetic preferences for Attiq Butt & the crew..."
                    value={details.notes}
                    onChange={(e) => setDetails({ notes: e.target.value })}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={back}
              disabled={step === 1 || submitting}
              leftIcon={<ArrowLeft className="size-4" />}
            >
              Back
            </Button>
            {step < 5 ? (
              <Button onClick={next} disabled={!canContinue} rightIcon={<ArrowRight className="size-4" />}>
                Continue
              </Button>
            ) : (
              <Button onClick={confirm} loading={submitting} leftIcon={<CalendarCheck className="size-4" />}>
                Confirm Shoot &amp; Send Gmail Alert
              </Button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Production Summary</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <SummaryRow label="Package" value={service?.name} />
              <SummaryRow
                label="Director / Lead"
                value={barberId === "any" ? "Any Master Artist" : getBarber(barberId ?? "")?.name}
              />
              <SummaryRow label="Date" value={date ? formatDate(date, "medium") : undefined} />
              <SummaryRow label="Call Time" value={time ?? undefined} />
            </dl>
            {service && (
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted">Total Investment</span>
                <span className="heading text-2xl text-gold">{formatCurrency(service.price)}</span>
              </div>
            )}
            <p className="mt-4 flex items-center gap-2 text-xs text-faint">
              <Camera className="size-3.5 text-gold" /> Includes 4K delivery &amp; color-graded master.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className={cn("text-right font-medium", value ? "text-foreground" : "text-faint")}>
        {value ?? "—"}
      </dd>
    </div>
  );
}
