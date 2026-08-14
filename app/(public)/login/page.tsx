"use client";

import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button, Input, useToast } from "@/components/core";
import { useAuthStore } from "@/store/authStore";
import { delay } from "@/lib/utils";

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const login = useAuthStore((s) => s.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ defaultValues: { email: "ahmed.khan@email.com", password: "" } });

  const onSubmit = async (data: LoginValues) => {
    await delay(null, 700);
    login(data.email, data.password);
    toast.success("Welcome back!", "Signed in");
    router.push("/account");
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your appointments and profile."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-gold hover:underline">
            Create account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@email.com"
          leftIcon={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Enter a valid email" },
          })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="size-4" />}
          error={errors.password?.message}
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
        />
        <div className="flex justify-end">
          <button type="button" className="text-sm text-muted transition-colors hover:text-gold">
            Forgot password?
          </button>
        </div>
        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
          Sign in
        </Button>
      </form>
      <p className="mt-4 rounded-lg border border-border bg-secondary px-3 py-2 text-center text-xs text-faint">
        Demo mode — any credentials will sign you in.
      </p>
    </AuthShell>
  );
}
