import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/core/Toast";

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
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
