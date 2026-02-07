'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apolloClient } from "@/lib/apollo-client";
import { GET_USER_BY_SLUG } from "@/lib/queries";
import { getThemeCSSVariables, type ColorTheme, type TemplateStyle } from "@/lib/themes";
import type { User } from "@/types/user";
import { RestoTemplate } from "@/components/templates/RestoTemplate";
import { SushiTemplate } from "@/components/templates/SushiTemplate";

export function UserPageClient() {
  const params = useParams();
  const username = params?.username as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (!username) {
        setError('Username is required');
        setLoading(false);
        return;
      }

      try {
        const { data } = await apolloClient.query({
          query: GET_USER_BY_SLUG,
          variables: { slug: username },
        });
        setUser(data?.getUserBySlug || null);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h1>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Show "coming soon" page if user profile is not published
  if (user.isPublished === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center px-6 py-12 max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Binnenkort beschikbaar</h1>
          <p className="text-gray-600 text-lg">
            Dit profiel wordt momenteel bijgewerkt. Kom binnenkort terug!
          </p>
        </div>
      </div>
    );
  }

  const templateStyle: TemplateStyle = user.templateStyle || "resto";
  const colorTheme: ColorTheme = user.colorTheme || "beige";
  const themeVariables = getThemeCSSVariables(colorTheme);

  // Debug: log what we're getting from the API
  console.log("User data:", { templateStyle: user.templateStyle, colorTheme: user.colorTheme, resolved: { templateStyle, colorTheme } });

  const style = Object.entries(themeVariables).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {} as React.CSSProperties
  );

  // Template component mapping
  const TemplateComponent = {
    resto: RestoTemplate,
    sushi: SushiTemplate,
  }[templateStyle] || RestoTemplate; // Fallback to RestoTemplate

  return (
    <div className={`template-${templateStyle}`} style={style}>
      <TemplateComponent user={user} />
    </div>
  );
}

