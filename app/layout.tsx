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
    default: "Muhammadi Studio — Premium Photography & Cinematic Movie Production",
    template: "%s · Muhammadi Studio",
  },
  description:
    "Muhammadi Studio is an acclaimed photography and filmmaking production studio co-founded by Attiq Butt. Specializing in 4K cinematic wedding movies, royal portraits, commercials, and high-fashion editorial.",
  keywords: [
    "Muhammadi Studio",
    "Attiq Butt",
    "Muhammad Usman",
    "photography studio",
    "cinematography",
    "wedding films",
    "movie maker",
    "commercial video production",
    "4K drone shoots",
    "film production",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
