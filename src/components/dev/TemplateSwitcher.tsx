"use client";

import { useState, useEffect } from "react";
import { Palette, X } from "lucide-react";
import type { TemplateStyle } from "@/lib/themes";

interface TemplateSwitcherProps {
  currentTemplate: TemplateStyle;
  onTemplateChange: (template: TemplateStyle) => void;
}

const templates: { value: TemplateStyle; label: string; description: string }[] = [
  { value: "creative", label: "Creative", description: "Expressive & Artistic" },
  { value: "minimalist", label: "Minimalist", description: "Clean & Elegant" },
  { value: "business", label: "Business", description: "Professional & Corporate" },
  { value: "hero", label: "Hero", description: "Bold & Modern" },
  { value: "portfolio", label: "Portfolio", description: "Elegant & Artistic" },
  { value: "resto", label: "Resto Landingspage", description: "Restaurant Landing Page" },
];

export function TemplateSwitcher({ currentTemplate, onTemplateChange }: TemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === "development");
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-soft-xl hover:shadow-soft-lg transition-all duration-300 flex items-center justify-center group hover:scale-110 focus-ring"
        aria-label="Template Switcher"
      >
        <Palette className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
      </button>

      {/* Switcher panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="fixed bottom-24 right-6 z-50 bg-white/95 backdrop-blur-xl rounded-2xl shadow-soft-xl border border-border/50 p-6 w-80 animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Template Switcher</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent-light/50 transition-colors focus-ring"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>
            
            <p className="text-sm text-muted mb-6">
              Switch between templates (dev mode only)
            </p>

            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.value}
                  onClick={() => {
                    onTemplateChange(template.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 focus-ring ${
                    currentTemplate === template.value
                      ? "border-primary bg-primary/5 shadow-soft-sm"
                      : "border-border/50 hover:border-primary/30 hover:bg-accent-light/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground mb-1">
                        {template.label}
                      </div>
                      <div className="text-xs text-muted">{template.description}</div>
                    </div>
                    {currentTemplate === template.value && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted text-center">
                Current: <span className="font-semibold capitalize">{currentTemplate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

