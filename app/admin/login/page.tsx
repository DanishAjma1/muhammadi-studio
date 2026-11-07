"use client";

import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, useToast } from "@/components/core";
import { Logo } from "@/components/layout";
import { ADMIN_DEMO_CREDENTIALS, useAdminAuthStore } from "@/store/adminAuthStore";
import { delay } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const toast = useToast();
  const login = useAdminAuthStore((s) => s.login);
  const [email, setEmail] = useState(ADMIN_DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(ADMIN_DEMO_CREDENTIALS.password);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Enter your email and password.");
      return;
    }
    setLoading(true);
    await delay(null, 700);
    login(email);
    toast.success("Signed in to the dashboard.", "Welcome back");
    router.replace("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="hero-vignette absolute inset-0" />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <span className="mt-6 flex size-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <ShieldCheck className="size-6" />
          </span>
          <h1 className="heading mt-4 text-2xl text-foreground">Studio Admin Sign In</h1>
          <p className="mt-1 text-sm text-muted">Manage Muhammadi Studio productions &amp; shoots.</p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <Input
            label="Email"
            type="email"
            leftIcon={<Mail className="size-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            leftIcon={<Lock className="size-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Sign in
          </Button>
        </form>

        <div className="mt-5 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-center text-xs text-muted">
          <p className="font-medium text-gold">Demo credentials</p>
          <p className="mt-1">
            {ADMIN_DEMO_CREDENTIALS.email} · {ADMIN_DEMO_CREDENTIALS.password}
          </p>
        </div>
      </div>
    </div>
  );
}
