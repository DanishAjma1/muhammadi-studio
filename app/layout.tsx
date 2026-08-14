import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/core/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Barber & Co. — Premium Grooming for the Modern Gentleman",
    template: "%s · Barber & Co.",
  },
  description:
    "Premium barbershop offering haircuts, fades, beard styling and hot towel shaves. Book your appointment in under a minute.",
  keywords: ["barber", "barbershop", "haircut", "fade", "beard", "grooming", "shave"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
