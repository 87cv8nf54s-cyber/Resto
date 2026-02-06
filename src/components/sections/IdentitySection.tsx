import type { User } from "@/types/user";

interface IdentitySectionProps {
  user: User;
  variant?: "creative" | "minimalist" | "business";
}

export function IdentitySection({ user, variant = "minimalist" }: IdentitySectionProps) {
  const baseClasses = "text-center";

  const variantClasses = {
    creative: "py-12",
    minimalist: "py-8",
    business: "py-10 border-b border-border",
  };

  return (
    <header className={`${baseClasses} ${variantClasses[variant]}`}>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
        {user.naam}
      </h1>
      {user.companyName && (
        <p className="text-xl text-accent font-medium">{user.companyName}</p>
      )}
      {user.kvkNumber && (
        <p className="text-sm text-muted mt-1">KvK: {user.kvkNumber}</p>
      )}
    </header>
  );
}
