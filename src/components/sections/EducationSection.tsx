import type { Education } from "@/types/user";
import { formatDate } from "@/lib/dateUtils";

interface EducationSectionProps {
  educations: Education[];
  variant?: "creative" | "minimalist" | "business";
}

export function EducationSection({ educations, variant = "minimalist" }: EducationSectionProps) {
  if (!educations || educations.length === 0) {
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

  const itemClasses = {
    creative: "bg-white/50 rounded-lg p-4 shadow-sm",
    minimalist: "py-4 border-b border-border last:border-0",
    business: "py-3",
  };

  return (
    <section className={containerClasses[variant]}>
      <h2 className={headingClasses[variant]}>Opleiding</h2>
      <div className={variant === "creative" ? "grid gap-4" : "space-y-2"}>
        {educations.map((edu) => (
          <div key={edu.id} className={itemClasses[variant]}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
              <div>
                <h3 className="font-semibold text-foreground">{edu.institution}</h3>
                <p className="text-accent">
                  {edu.degree}
                  {edu.field && ` - ${edu.field}`}
                </p>
              </div>
              {(edu.startDate || edu.endDate) && (
                <span className="text-sm text-muted whitespace-nowrap">
                  {formatDate(edu.startDate)}
                  {edu.startDate && edu.endDate && " - "}
                  {formatDate(edu.endDate) || "Heden"}
                </span>
              )}
            </div>
            {edu.description && (
              <p className="text-sm text-muted mt-2">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
