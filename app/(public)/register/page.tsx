"use client";

import { Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button, Input, useToast } from "@/components/core";
import { useAuthStore } from "@/store/authStore";
import { delay } from "@/lib/utils";

interface RegisterValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const registerUser = useAuthStore((s) => s.register);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>();

  const onSubmit = async (data: RegisterValues) => {
    await delay(null, 800);
    registerUser({ name: data.name, email: data.email, phone: data.phone });
    toast.success("Your account is ready.", "Welcome to Barber & Co.");
    router.push("/account");
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Book faster and keep track of every appointment."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-gold hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          placeholder="John Doe"
          leftIcon={<User className="size-4" />}
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />
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
          label="Phone"
          placeholder="+1 (555) 000-0000"
          leftIcon={<Phone className="size-4" />}
          error={errors.phone?.message}
          {...register("phone", { required: "Phone is required" })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="size-4" />}
          error={errors.password?.message}
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
        />
        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
