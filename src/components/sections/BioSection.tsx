import type { User } from "@/types/user";

interface BioSectionProps {
  user: User;
  variant?: "creative" | "minimalist" | "business";
}

export function BioSection({ user, variant = "minimalist" }: BioSectionProps) {
  if (!user.bio) {
    return null;
  }

  const containerClasses = {
    creative: "py-8 px-4 bg-accent-light/20 rounded-lg",
    minimalist: "py-6 max-w-2xl mx-auto",
    business: "py-8 border-b border-border",
  };

  const textClasses = {
    creative: "text-lg leading-relaxed text-foreground italic",
    minimalist: "text-base leading-relaxed text-muted text-center",
    business: "text-base leading-relaxed text-foreground",
  };

  return (
    <section className={containerClasses[variant]}>
      <p className={textClasses[variant]}>{user.bio}</p>
    </section>
  );
}
