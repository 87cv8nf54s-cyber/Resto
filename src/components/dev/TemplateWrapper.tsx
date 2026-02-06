"use client";

import { useState } from "react";
import type { User } from "@/types/user";
import type { TemplateStyle, ColorTheme } from "@/lib/themes";
import { getThemeCSSVariables } from "@/lib/themes";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate";
import { BusinessTemplate } from "@/components/templates/BusinessTemplate";
import { HeroTemplate } from "@/components/templates/HeroTemplate";
import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";
import { RestoTemplate } from "@/components/templates/RestoTemplate";
import { TemplateSwitcher } from "./TemplateSwitcher";

interface TemplateWrapperProps {
  user: User;
  initialTemplate: TemplateStyle;
  colorTheme: ColorTheme;
}

export function TemplateWrapper({ user, initialTemplate, colorTheme }: TemplateWrapperProps) {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateStyle>(initialTemplate);

  const themeVariables = getThemeCSSVariables(colorTheme);
  const style = Object.entries(themeVariables).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {} as React.CSSProperties
  );

  const TemplateComponent = {
    creative: CreativeTemplate,
    minimalist: MinimalistTemplate,
    business: BusinessTemplate,
    hero: HeroTemplate,
    portfolio: PortfolioTemplate,
    resto: RestoTemplate,
  }[currentTemplate];

  return (
    <div className={`template-${currentTemplate}`} style={style}>
      <TemplateComponent user={user} />
      <TemplateSwitcher
        currentTemplate={currentTemplate}
        onTemplateChange={setCurrentTemplate}
      />
    </div>
  );
}

