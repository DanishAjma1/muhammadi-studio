import Image from "next/image";
import Link from "next/link";
import { img } from "@/data";
import { Logo } from "@/components/layout";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-center px-4 py-16 pt-28 sm:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="heading mt-8 text-3xl text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-2 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-muted">{footer}</p>
        </div>
      </div>

      {/* Image side */}
      <div className="relative hidden lg:block">
        <Image src={img.heroSecondary} alt="Barbershop" fill className="object-cover" sizes="50vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <blockquote className="heading max-w-md text-3xl leading-tight text-white">
            &ldquo;Best fade I&apos;ve had in years.&rdquo;
          </blockquote>
          <p className="mt-3 text-sm text-white/70">— Ahmed R., regular since 2022</p>
          <Link href="/" className="mt-6 inline-block text-sm text-gold hover:underline">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
