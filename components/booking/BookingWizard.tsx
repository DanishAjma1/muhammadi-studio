"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Film,
  Building,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge, Button, Input, StarRating, TextArea, useToast } from "@/components/core";
import { useAppointments, useAvailability, useBarbers, useServices } from "@/hooks";
import { useBookingStore } from "@/store/bookingStore";
import { cn, formatDate } from "@/lib/utils";
import { shopSettings } from "@/data";
import { Calendar } from "./Calendar";
import { BookingStepper } from "./BookingStepper";

export function BookingWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<"all" | "setup" | "function">("all");

  const { activeServices } = useServices();
  const { activeBarbers, getById: getBarber } = useBarbers();
  const { addAppointment } = useAppointments();

  const {
    step,
    serviceIds,
    barberId,
    date,
    time,
    details,
    setService,
    toggleService,
    setBarber,
    setDate,
    setTime,
    setDetails,
    next,
    back,
    goTo,
    reset,
    setLastBooking,
  } = useBookingStore();

  const slots = useAvailability(date, barberId === "any" ? null : barberId);

  // Pre-select from query (?service= / ?barber=)
  useEffect(() => {
    const svc = params.get("service");
    const brb = params.get("barber");
    if (svc) setService(svc);
    if (brb) setBarber(brb);
    if (svc && brb) goTo(3);
    else if (svc) goTo(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedServices = activeServices.filter((s) => serviceIds.includes(s.id));

  const filteredServices =
    filterCategory === "all"
      ? activeServices
      : activeServices.filter((s) => s.category === filterCategory);

  const canContinue =
    (step === 1 && serviceIds.length > 0) ||
    (step === 2 && !!barberId) ||
    (step === 3 && !!date) ||
    (step === 4 && !!time) ||
    step === 5;

  const confirm = async () => {
    if (!details.name.trim() || !details.phone.trim()) {
      toast.error("Please enter your full name and phone/WhatsApp number.");
      return;
    }
    if (!details.email.trim()) {
      toast.error("Please enter your email address to receive your confirmation letter once approved.");
      return;
    }
    if (selectedServices.length === 0 || !date || !time) {
      toast.error("Please ensure at least one function, date, and call time are selected.");
      return;
    }

    const assigned = barberId === "any" ? activeBarbers[0] : (getBarber(barberId!) || activeBarbers[0]);

    setSubmitting(true);

    const functionNames = selectedServices.map((s) => s.name);
    const primaryServiceName = functionNames.join(" + ");

    const appt = addAppointment({
      customerId: "guest",
      customerName: details.name,
      customerPhone: details.phone,
      customerEmail: details.email,
      barberId: assigned.id,
      barberName: assigned.name,
      serviceId: selectedServices[0].id,
      serviceName: primaryServiceName,
      functionIds: selectedServices.map((s) => s.id),
      functionNames,
      venueCity: details.venue,
      date,
      time,
      durationMin: 180,
      price: 0,
      status: "pending", // Pending until Atiq Butt approves
      notes: details.notes || undefined,
      source: "direct",
    });

    // Dispatch Gmail SMTP booking notification
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: appt.id,
          serviceName: primaryServiceName,
          functions: functionNames,
          price: 0,
          barberName: assigned.name,
          date,
          time,
          durationMin: 180,
          clientName: details.name,
          clientPhone: details.phone,
          clientEmail: details.email,
          venue: details.venue,
          notes: details.notes,
        }),
      });
    } catch (err) {
      console.warn("Background SMTP booking notification notice:", err);
    }

    setLastBooking(appt);
    setSubmitting(false);
    toast.success("Event booking request submitted! Reviewing by Atiq Butt.", "Request Received");
    router.push("/book/success");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
      <div className="mb-8 text-center">
        <p className="eyebrow mb-2">Muhammadi Studio &amp; Event Management</p>
        <h1 className="heading text-3xl text-foreground sm:text-4xl">Book Your Event &amp; Setups</h1>
        <p className="mt-2 text-sm text-muted">
          Select one or more functions (Wedding, Mehndi, Birthday, Corporate) and specialized setups (Movie, Studio, Decor, Lighting).
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
              {/* Step 1 — Multi-Function / Setup Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="heading text-xl text-foreground">Select Function(s) &amp; Setup(s)</h2>
                      <p className="text-xs text-muted">You can select more than one function or setup for your event.</p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full border border-border bg-secondary p-1 text-xs">
                      <button
                        onClick={() => setFilterCategory("all")}
                        className={cn("rounded-full px-3 py-1 font-medium transition-colors", filterCategory === "all" ? "bg-gold text-black" : "text-muted hover:text-foreground")}
                      >
                        All ({activeServices.length})
                      </button>
                      <button
                        onClick={() => setFilterCategory("setup")}
                        className={cn("rounded-full px-3 py-1 font-medium transition-colors", filterCategory === "setup" ? "bg-gold text-black" : "text-muted hover:text-foreground")}
                      >
                        Core Setups (4)
                      </button>
                      <button
                        onClick={() => setFilterCategory("function")}
                        className={cn("rounded-full px-3 py-1 font-medium transition-colors", filterCategory === "function" ? "bg-gold text-black" : "text-muted hover:text-foreground")}
                      >
                        Occasions (6)
                      </button>
                    </div>
                  </div>

                  {serviceIds.length > 0 && (
                    <div className="flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs text-gold">
                      <Sparkles className="size-4 shrink-0" />
                      <span>
                        <strong>{serviceIds.length} item(s) selected:</strong>{" "}
                        {selectedServices.map((s) => s.name).join(", ")}
                      </span>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredServices.map((s) => {
                      const isSelected = serviceIds.includes(s.id);
                      return (
                        <div
                          key={s.id}
                          onClick={() => toggleService(s.id)}
                          className={cn(
                            "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-300",
                            isSelected
                              ? "border-gold bg-gold/10 ring-1 ring-gold shadow-md"
                              : "border-border bg-card hover:border-gold/40 hover:bg-elevated",
                          )}
                        >
                          <div className="relative h-32 w-full overflow-hidden bg-secondary">
                            <Image
                              src={s.image}
                              alt={s.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 320px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute top-2.5 right-2.5">
                              <span
                                className={cn(
                                  "flex size-6 items-center justify-center rounded-md border text-xs font-bold transition-colors",
                                  isSelected ? "border-gold bg-gold text-black" : "border-white/50 bg-black/60 text-white",
                                )}
                              >
                                {isSelected ? <Check className="size-4 stroke-[3]" /> : "+"}
                              </span>
                            </div>
                            <div className="absolute bottom-2 left-3 right-3">
                              <Badge variant={s.category === "setup" ? "gold" : "default"}>
                                {s.category === "setup" ? "Specialized Setup" : "Event Occasion"}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col justify-between p-4">
                            <div>
                              <h3 className="heading text-base font-bold text-foreground group-hover:text-gold transition-colors">
                                {s.name}
                              </h3>
                              {s.tagline && <p className="text-xs text-gold font-medium mt-0.5">{s.tagline}</p>}
                              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{s.description}</p>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2.5 text-xs">
                              <span className="font-semibold text-gold">Custom Quote</span>
                              <span className="text-muted">
                                {isSelected ? "✓ Click to Remove" : "+ Click to Add"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2 — Director / Manager */}
              {step === 2 && (
                <div>
                  <h2 className="heading mb-1 text-xl text-foreground">Lead Event Director &amp; Management</h2>
                  <p className="mb-4 text-xs text-muted">
                    Atiq Butt personally oversees event planning, decor architecture, and cinema-grade execution.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeBarbers.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBarber(b.id)}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors",
                          barberId === b.id ? "border-gold bg-gold/10 ring-1 ring-gold" : "border-border bg-card hover:border-gold/40",
                        )}
                      >
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-gold/40">
                          <Image src={b.avatar} alt={b.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground text-base">{b.name}</span>
                            <span className={cn("size-4 rounded-full border flex items-center justify-center", barberId === b.id ? "border-gold bg-gold text-black" : "border-border")}>
                              {barberId === b.id && <Check className="size-3" />}
                            </span>
                          </div>
                          <span className="block text-xs font-semibold text-gold">{b.title}</span>
                          <span className="mt-1 flex items-center gap-1 text-xs text-muted">
                            <StarRating rating={b.rating} size={11} /> {b.experienceYears}+ years exp
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Date */}
              {step === 3 && (
                <div>
                  <h2 className="heading mb-1 text-xl text-foreground">Select Event Date</h2>
                  <p className="mb-4 text-xs text-muted">For multi-day bookings (e.g. Mehndi + Barat + Walima), select your start date and note other days in the notes.</p>
                  <Calendar value={date} onChange={setDate} />
                </div>
              )}

              {/* Step 4 — Time / Session */}
              {step === 4 && (
                <div>
                  <h2 className="heading mb-1 text-xl text-foreground">Select Function Session / Call Time</h2>
                  <p className="mb-4 text-sm text-muted">{date && formatDate(date, "weekday")}</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                      { label: "Morning Session (10:00 AM)", value: "10:00 AM" },
                      { label: "Afternoon Lunch (01:00 PM)", value: "01:00 PM" },
                      { label: "Evening Reception (06:00 PM)", value: "06:00 PM" },
                      { label: "Night Barat / Gala (08:30 PM)", value: "08:30 PM" },
                      { label: "Full Day Setup (10:00 AM – 11:00 PM)", value: "Full Day" },
                    ].map((slot) => (
                      <button
                        key={slot.value}
                        onClick={() => setTime(slot.value)}
                        className={cn(
                          "rounded-xl border p-3 text-left transition-colors",
                          time === slot.value
                            ? "border-gold bg-gold text-black font-semibold"
                            : "border-border bg-card text-foreground hover:border-gold/50",
                        )}
                      >
                        <span className="block text-sm">{slot.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 — Details */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="heading text-xl text-foreground">Your Contact &amp; Event Venue Details</h2>
                    <p className="text-xs text-muted">
                      Once submitted, Atiq Butt will review your event requirements and you will receive an official confirmation email.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Your full name"
                      placeholder="e.g. Muhammad Rizwan / Sarah Khan"
                      value={details.name}
                      onChange={(e) => setDetails({ name: e.target.value })}
                    />
                    <Input
                      label="Phone / WhatsApp (Pakistan or Int'l)"
                      placeholder="e.g. 0313-7526305"
                      value={details.phone}
                      onChange={(e) => setDetails({ phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Email address (Required for confirmation email)"
                      type="email"
                      placeholder="e.g. client@gmail.com"
                      value={details.email}
                      onChange={(e) => setDetails({ email: e.target.value })}
                    />
                    <Input
                      label="Event Venue / Hall / City Location"
                      placeholder="e.g. Royal Palm Marquee, Lahore / Main Bazar"
                      value={details.venue || ""}
                      onChange={(e) => setDetails({ venue: e.target.value })}
                    />
                  </div>
                  <TextArea
                    label="Special Requirements & Setup Vision"
                    placeholder="Provide details about stage theme, floral colors, number of guests, or multi-day itinerary..."
                    value={details.notes}
                    onChange={(e) => setDetails({ notes: e.target.value })}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
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
                Submit Booking Request for Approval
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Event Summary</h3>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                  Selected Functions ({selectedServices.length})
                </dt>
                {selectedServices.length > 0 ? (
                  <div className="space-y-1">
                    {selectedServices.map((s) => (
                      <div key={s.id} className="flex items-center gap-1.5 text-xs text-foreground">
                        <Check className="size-3 text-gold shrink-0" />
                        <span className="font-medium">{s.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-faint">None selected yet</p>
                )}
              </div>

              <div className="border-t border-border/60 pt-2.5">
                <SummaryRow
                  label="Lead Director"
                  value={barberId === "any" ? "Atiq Butt (Owner)" : (getBarber(barberId ?? "")?.name || "Atiq Butt")}
                />
                <SummaryRow label="Date" value={date ? formatDate(date, "medium") : undefined} />
                <SummaryRow label="Session" value={time ?? undefined} />
                <SummaryRow label="Venue City" value={details.venue || "To be specified"} />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-3 text-center">
              <span className="text-xs text-muted block">Pricing Model</span>
              <span className="heading text-lg text-gold font-bold">Custom Quote / Tailored</span>
              <span className="text-[11px] text-muted block mt-0.5">Finalized upon admin approval</span>
            </div>

            <div className="mt-4 border-t border-border pt-4 text-xs text-muted space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 text-gold shrink-0 mt-0.5" />
                <span>Main Bazar, New Plaza, Shop No: 2, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-gold shrink-0" />
                <a href="tel:03137526305" className="hover:text-gold transition-colors font-medium text-foreground">
                  0313-7526305 (Atiq Butt)
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={cn("text-right text-xs font-medium", value ? "text-foreground" : "text-faint")}>
        {value ?? "—"}
      </dd>
    </div>
  );
}
