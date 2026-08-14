import { Footer, MobileBookBar, Navbar } from "@/components/layout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-20 sm:pb-0">{children}</main>
      <Footer />
      <MobileBookBar />
    </div>
  );
}
