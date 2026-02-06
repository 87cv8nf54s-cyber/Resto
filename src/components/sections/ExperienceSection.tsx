import type { WorkExperience } from "@/types/user";
import { formatDate } from "@/lib/dateUtils";

interface ExperienceSectionProps {
  experiences: WorkExperience[];
  variant?: "creative" | "minimalist" | "business";
}

export function ExperienceSection({ experiences, variant = "minimalist" }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) {
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
    business: "py-4",
  };

  return (
    <section className={containerClasses[variant]}>
      <h2 className={headingClasses[variant]}>Werkervaring</h2>
      <div className={variant === "creative" ? "grid gap-4" : "space-y-2"}>
        {experiences.map((exp) => (
          <div key={exp.id} className={itemClasses[variant]}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
              <div>
                <h3 className="font-semibold text-foreground">{exp.company}</h3>
                {exp.role && <p className="text-accent">{exp.role}</p>}
              </div>
              <span className="text-sm text-muted whitespace-nowrap">
                {formatDate(exp.startDate)}
                {exp.startDate && " - "}
                {exp.current ? "Heden" : formatDate(exp.endDate)}
              </span>
            </div>
            {exp.description && (
              <p className="text-sm text-muted mt-2">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
