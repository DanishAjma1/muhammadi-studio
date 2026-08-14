import Image from "next/image";
import { cn, initials } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  ring?: boolean;
}

const sizes = {
  xs: "size-7 text-[10px]",
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
  xl: "size-20 text-xl",
};

const px = { xs: 28, sm: 36, md: 44, lg: 56, xl: 80 };

export function Avatar({ src, name, size = "md", className, ring }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-elevated font-semibold text-muted",
        sizes[size],
        ring && "ring-2 ring-gold/40 ring-offset-2 ring-offset-background",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={name} width={px[size]} height={px[size]} className="size-full object-cover" />
      ) : (
        initials(name)
      )}
    </span>
  );
}

/** Overlapping stack of avatars, e.g. for "2,000+ happy clients". */
export function AvatarGroup({
  people,
  max = 4,
  size = "sm",
}: {
  people: { src?: string; name: string }[];
  max?: number;
  size?: "xs" | "sm" | "md";
}) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <div className="flex items-center -space-x-3">
      {shown.map((p, i) => (
        <Avatar
          key={i}
          src={p.src}
          name={p.name}
          size={size}
          className="ring-2 ring-background"
        />
      ))}
      {extra > 0 && (
        <span
          className={cn(
            "relative inline-flex items-center justify-center rounded-full bg-gold text-xs font-semibold text-black ring-2 ring-background",
            size === "xs" ? "size-7" : size === "sm" ? "size-9" : "size-11",
          )}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
