import { AccountNav } from "@/components/account/AccountNav";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
      <div className="mb-8 border-b border-border pb-6">
        <AccountNav />
      </div>
      {children}
    </div>
  );
}
