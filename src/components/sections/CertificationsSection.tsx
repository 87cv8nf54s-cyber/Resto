import type { Certification } from "@/types/user";
import { formatDate } from "@/lib/dateUtils";

interface CertificationsSectionProps {
  certifications: Certification[];
  variant?: "creative" | "minimalist" | "business";
}

export function CertificationsSection({ certifications, variant = "minimalist" }: CertificationsSectionProps) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  const containerClasses = {
    creative: "py-8",
    minimalist: "py-6",
    business: "py-8 border-b border-border",
  };

  const headingClasses = {
    creative: "text-2xl font-heading font-bold text-accent mb-6",
    minimalist: "text-xl font-medium text-foreground mb-4 text-center",
    business: "text-xl font-heading font-semibold text-foreground mb-6 uppercase tracking-wide",
  };

  return (
    <section className={containerClasses[variant]}>
      <h2 className={headingClasses[variant]}>Certificeringen</h2>
      <div className="grid gap-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={`flex flex-col md:flex-row md:justify-between md:items-center gap-1 py-2 ${
              variant === "creative" ? "bg-white/50 rounded-lg p-3" : ""
            }`}
          >
            <div>
              <h3 className="font-medium text-foreground">{cert.name}</h3>
              {cert.issuer && <p className="text-sm text-muted">{cert.issuer}</p>}
            </div>
            {(cert.startDate || cert.endDate) && (
              <span className="text-sm text-muted">
                {formatDate(cert.startDate)}{cert.endDate && ` - ${formatDate(cert.endDate)}`}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
