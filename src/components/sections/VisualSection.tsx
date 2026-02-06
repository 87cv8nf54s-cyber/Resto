import Image from "next/image";
import type { User } from "@/types/user";

interface VisualSectionProps {
  user: User;
  variant?: "creative" | "minimalist" | "business";
}

export function VisualSection({ user, variant = "minimalist" }: VisualSectionProps) {
  if (!user.profilePicture && !user.logo) {
    return null;
  }

  const containerClasses = {
    creative: "flex flex-col md:flex-row items-center justify-center gap-8 py-8",
    minimalist: "flex flex-col items-center gap-6 py-6",
    business: "flex items-center justify-between py-8 border-b border-border",
  };

  const imageClasses = {
    creative: "rounded-full border-4 border-accent shadow-lg",
    minimalist: "rounded-lg",
    business: "rounded-sm border border-border",
  };

  return (
    <section className={containerClasses[variant]}>
      {user.profilePicture && (
        <div className="relative">
          <Image
            src={user.profilePicture}
            alt={`Profile photo of ${user.naam}`}
            width={variant === "creative" ? 180 : 150}
            height={variant === "creative" ? 180 : 150}
            className={`object-cover ${imageClasses[variant]}`}
            style={{ width: variant === "creative" ? 180 : 150, height: variant === "creative" ? 180 : 150 }}
          />
        </div>
      )}
      {user.logo && (
        <div className="relative">
          <Image
            src={user.logo}
            alt={`Logo of ${user.companyName || user.naam}`}
            width={120}
            height={60}
            className="object-contain"
          />
        </div>
      )}
    </section>
  );
}
