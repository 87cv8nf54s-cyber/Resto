'use client';

import { useState } from 'react';
import { Profile } from '@/types/profile';

interface TemplateCreativeProps {
  profile: Profile;
}

export default function TemplateCreative({ profile }: TemplateCreativeProps) {
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
    <div className="min-h-screen bg-background" data-theme="creative">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="bg-card rounded-3xl border-2 border-primary/20 shadow-lg p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl translate-y-20 -translate-x-20"></div>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl transform rotate-6 opacity-30 blur-sm"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl bg-muted flex items-center justify-center">
                  <svg className="w-1/2 h-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {profile.name}
                </h1>
                <p className="text-xl sm:text-2xl text-primary mb-6 font-semibold">
                  {profile.company.name}
                </p>
                <div className={`text-muted-foreground leading-relaxed ${!bioExpanded && shouldShowToggle ? 'line-clamp-6' : ''}`}>
                  {profile.bio}
                </div>
                {shouldShowToggle && (
                  <button
                    onClick={() => setBioExpanded(!bioExpanded)}
                    className="mt-3 text-sm font-medium text-primary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full px-4 py-1.5 bg-primary/10 hover:bg-primary/20"
                    aria-expanded={bioExpanded}
                  >
                    {bioExpanded ? 'Lees minder' : 'Lees meer'}
                  </button>
                )}
              </div>
            </div>
            <div className="relative mt-10">
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                E-mail
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border-2 border-primary/20 shadow-md p-8 relative overflow-hidden group hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-full blur-2xl"></div>
              <h2 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mr-3 shadow-lg"></span>
                Bedrijfsgegevens
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <div><span className="font-medium text-foreground">Bedrijf:</span> {profile.company.name}</div>
                {profile.company.kvk && <div><span className="font-medium text-foreground">KvK:</span> {profile.company.kvk}</div>}
                {profile.company.btw && <div><span className="font-medium text-foreground">BTW:</span> {profile.company.btw}</div>}
                <div><span className="font-medium text-foreground">Locatie:</span> {profile.company.location}</div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border-2 border-accent/20 shadow-md p-8 relative overflow-hidden group hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <h2 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full mr-3 shadow-lg"></span>
                Opleidingen
              </h2>
              <ul className="space-y-4 text-muted-foreground">
                {profile.education.map((edu, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 mr-3 flex-shrink-0 shadow-sm"></span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 sm:mb-16 flex items-center">
            <span className="w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full mr-4 shadow-lg"></span>
            Ervaring
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedPortfolio.map((item, index) => (
              <article key={index} className="bg-card rounded-2xl border-2 border-primary/20 shadow-md p-8 relative overflow-hidden group hover:shadow-xl transition-all hover:scale-[1.02] hover:border-accent/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{item.companyName}</h3>
                    <time className="text-sm font-semibold text-muted-foreground sm:ml-4 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-1.5 rounded-full border border-primary/20">
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

      <footer className="border-t-2 border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-card rounded-2xl border-2 border-primary/20 shadow-lg p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-10">
              <div className="relative w-32 h-16 flex-shrink-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-3 border-2 border-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">{profile.company.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mr-3 shadow-lg"></span>
                  Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground text-sm">
                  <a href={`mailto:${profile.contact.email}`} className="flex items-center hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-3 py-1.5 hover:bg-primary/10">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 shadow-sm"></span>
                    {profile.contact.email}
                  </a>
                  <a href={profile.contact.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-3 py-1.5 hover:bg-primary/10">
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
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 shadow-sm"></span>
                      {profile.contact.website.replace(/^https?:\/\//, '')}
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 shadow-sm"></span>
                    {profile.contact.location}
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
