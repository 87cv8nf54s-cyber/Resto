'use client';

import { useState } from 'react';
import { Profile } from '@/types/profile';

interface TemplateModernProps {
  profile: Profile;
}

export default function TemplateModern({ profile }: TemplateModernProps) {
  const [bioExpanded, setBioExpanded] = useState(false);
  const shouldShowToggle = profile.bio.length > 300;

  const sortedPortfolio = [...profile.portfolio].sort((a, b) => {
    if (a.endDate === null && b.endDate !== null) return -1;
    if (a.endDate !== null && b.endDate === null) return 1;
    if (a.endDate === null && b.endDate === null) return 0;
    return (b.endDate || '').localeCompare(a.endDate || '');
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Heden';
    const [year, month] = dateStr.split('-');
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background" data-theme="modern">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="bg-card rounded-2xl border shadow-lg p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-2xl transform rotate-3 opacity-30 blur-sm"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-background shadow-xl bg-muted flex items-center justify-center">
                  <svg className="w-1/2 h-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-card-foreground mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {profile.name}
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground mb-6 font-semibold">
                  {profile.company.name}
                </p>
                <div className={`text-muted-foreground leading-relaxed ${!bioExpanded && shouldShowToggle ? 'line-clamp-6' : ''}`}>
                  {profile.bio}
                </div>
                {shouldShowToggle && (
                  <button
                    onClick={() => setBioExpanded(!bioExpanded)}
                    className="mt-3 text-sm font-medium text-primary hover:text-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-3 py-1.5 bg-primary/10 hover:bg-primary/20 transition-all"
                    aria-expanded={bioExpanded}
                  >
                    {bioExpanded ? 'Lees minder' : 'Lees meer'}
                  </button>
                )}
              </div>
            </div>
            <div className="relative mt-8">
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                E-mail
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border shadow-md p-6 hover:shadow-lg transition-all hover:scale-[1.01] border-primary/10">
              <h2 className="text-xl font-semibold text-card-foreground mb-6 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 shadow-sm ring-2 ring-primary/20"></span>
                Bedrijfsgegevens
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div><span className="font-semibold text-foreground">Bedrijf:</span> {profile.company.name}</div>
                </div>
                {profile.company.kvk && (
                  <div className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div><span className="font-semibold text-foreground">KvK:</span> {profile.company.kvk}</div>
                  </div>
                )}
                {profile.company.btw && (
                  <div className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div><span className="font-semibold text-foreground">BTW:</span> {profile.company.btw}</div>
                  </div>
                )}
                <div className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div><span className="font-semibold text-foreground">Locatie:</span> {profile.company.location}</div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border shadow-md p-6 hover:shadow-lg transition-all hover:scale-[1.01] border-primary/10">
              <h2 className="text-xl font-semibold text-card-foreground mb-6 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 shadow-sm ring-2 ring-primary/20"></span>
                Opleidingen
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                {profile.education.map((edu, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0 shadow-sm ring-1 ring-primary/30"></span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-8 sm:mb-12">Ervaring</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedPortfolio.map((item, index) => (
              <article key={index} className="bg-card rounded-2xl border shadow-md p-6 hover:shadow-xl transition-all hover:scale-[1.02] hover:border-primary/40 relative overflow-hidden group border-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{item.companyName}</h3>
                    <time className="text-sm font-medium text-muted-foreground bg-gradient-to-r from-muted to-muted/80 px-3 py-1.5 rounded-lg sm:ml-4 inline-block border shadow-sm">
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </time>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-card rounded-2xl border shadow-md p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
            <div className="relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                <div className="relative w-32 h-16 flex-shrink-0 bg-muted rounded-xl p-2 shadow-sm flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{profile.company.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Contact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground text-sm">
                    <a href={`mailto:${profile.contact.email}`} className="flex items-center hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 shadow-sm"></span>
                      {profile.contact.email}
                    </a>
                    <a href={profile.contact.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 shadow-sm"></span>
                      LinkedIn
                    </a>
                    {profile.contact.phone && (
                      <div className="flex items-center text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 shadow-sm"></span>
                        {profile.contact.phone}
                      </div>
                    )}
                    {profile.contact.website && (
                      <div className="flex items-center text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 shadow-sm"></span>
                        {profile.contact.website.replace(/^https?:\/\//, '')}
                      </div>
                    )}
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 shadow-sm"></span>
                      {profile.contact.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
