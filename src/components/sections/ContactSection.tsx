import type { User } from "@/types/user";

interface ContactSectionProps {
  user: User;
  variant?: "creative" | "minimalist" | "business";
}

export function ContactSection({ user, variant = "minimalist" }: ContactSectionProps) {
  const hasContact = user.email || user.linkedinUrl || user.address;

  if (!hasContact) {
    return null;
  }

  const containerClasses = {
    creative: "py-8 bg-accent/10 rounded-lg px-6",
    minimalist: "py-8 text-center",
    business: "py-8",
  };

  const headingClasses = {
    creative: "text-2xl font-heading font-bold text-accent mb-6",
    minimalist: "text-xl font-medium text-foreground mb-4",
    business: "text-xl font-heading font-semibold text-foreground mb-6 uppercase tracking-wide",
  };

  const formatAddress = () => {
    if (!user.address) return null;
    const parts = [
      user.address.street,
      user.address.postalCode,
      user.address.city,
      user.address.country,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : null;
  };

  const address = formatAddress();

  return (
    <section className={containerClasses[variant]}>
      <h2 className={headingClasses[variant]}>Contact</h2>
      <div className={`space-y-3 ${variant === "minimalist" ? "inline-block text-left" : ""}`}>
        {user.email && (
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${user.email}`} className="text-foreground hover:text-accent transition-colors">
              {user.email}
            </a>
          </div>
        )}
        {user.linkedinUrl && (
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-foreground">{address}</span>
          </div>
        )}
      </div>
    </section>
  );
}
