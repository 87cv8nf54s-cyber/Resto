'use client';

import { useState } from 'react';
import { Profile } from '@/types/profile';

interface TemplateBusinessProps {
  profile: Profile;
}

export default function TemplateBusiness({ profile }: TemplateBusinessProps) {
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
    <div className="min-h-screen bg-muted/30" data-theme="business">
      <header className="border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="bg-card rounded-md border-2 border-border shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="relative w-32 h-32 mx-auto md:mx-0 border-2 border-border bg-muted flex items-center justify-center">
                  <svg className="w-1/2 h-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="md:col-span-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-3 uppercase tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-lg sm:text-xl text-primary mb-6 font-bold border-l-4 border-primary pl-4 uppercase tracking-wide">
                  {profile.company.name}
                </p>
                <div className={`text-muted-foreground leading-relaxed mb-4 ${!bioExpanded && shouldShowToggle ? 'line-clamp-6' : ''}`}>
                  {profile.bio}
                </div>
                {shouldShowToggle && (
                  <button
                    onClick={() => setBioExpanded(!bioExpanded)}
                    className="text-sm font-bold text-foreground hover:text-foreground/80 underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-expanded={bioExpanded}
                  >
                    {bioExpanded ? 'Lees minder' : 'Lees meer'}
                  </button>
                )}
                <div className="mt-8">
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-bold text-primary-foreground uppercase tracking-wide shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    E-mail
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-10 sm:py-14 bg-background border-y-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-md border-2 border-border shadow-sm p-8">
              <h2 className="text-xl font-bold text-card-foreground mb-6 border-b-2 border-primary/30 pb-3 uppercase tracking-wide">
                Bedrijfsgegevens
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold text-foreground">Bedrijf:</span>
                  <span>{profile.company.name}</span>
                </div>
                {profile.company.kvk && (
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-foreground">KvK:</span>
                    <span>{profile.company.kvk}</span>
                  </div>
                )}
                {profile.company.btw && (
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-foreground">BTW:</span>
                    <span>{profile.company.btw}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold text-foreground">Locatie:</span>
                  <span>{profile.company.location}</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-md border-2 border-border shadow-sm p-8">
              <h2 className="text-xl font-bold text-card-foreground mb-6 border-b-2 border-primary/30 pb-3 uppercase tracking-wide">
                Opleidingen
              </h2>
              <ul className="space-y-4 text-muted-foreground">
                {profile.education.map((edu, index) => (
                  <li key={index} className="border-l-4 border-primary pl-4 py-2 font-medium">
                    {edu}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-12 border-b-2 border-primary/30 pb-4 uppercase tracking-wide">
            Ervaring
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedPortfolio.map((item, index) => (
              <article key={index} className="bg-card rounded-md border-2 border-border shadow-sm p-6 hover:border-primary/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 pb-4 border-b-2 border-primary/20">
                  <h3 className="text-xl font-bold text-card-foreground mb-2 uppercase tracking-tight">
                    {item.companyName}
                  </h3>
                  <time className="text-sm font-bold text-muted-foreground sm:ml-4 whitespace-nowrap bg-muted px-3 py-1.5 border border-border">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </time>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="bg-card rounded-md border-2 border-border shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="relative w-40 h-20 bg-muted border-2 border-border p-4 flex items-center justify-center">
                  <span className="text-primary font-bold">{profile.company.name.substring(0, 2).toUpperCase()}</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-card-foreground mb-6 border-b-2 border-border pb-3 uppercase tracking-wide">
                  Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
                  <a href={`mailto:${profile.contact.email}`} className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1">
                    {profile.contact.email}
                  </a>
                  <a href={profile.contact.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1">
                    LinkedIn
                  </a>
                  {profile.contact.phone && <span className="text-muted-foreground">{profile.contact.phone}</span>}
                  {profile.contact.website && <span className="text-muted-foreground">{profile.contact.website.replace(/^https?:\/\//, '')}</span>}
                  <span>{profile.contact.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
