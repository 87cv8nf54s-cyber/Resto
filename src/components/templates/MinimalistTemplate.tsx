"use client";

import { useState } from "react";
import Image from "next/image";
import type { User } from "@/types/user";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Mail, Linkedin, Phone, Briefcase, Award } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";

interface MinimalistTemplateProps {
  user: User;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">{children}</h2>;
}

function VerticalTimelineItem({ 
  mainContent,
  expandContent,
  date, 
  isLeft = true,
  isFirst = false,
  isLast = false 
}: { 
  mainContent: React.ReactNode;
  expandContent?: (isLeft: boolean) => React.ReactNode;
  date?: string; 
  isLeft?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex items-start gap-4 lg:gap-8 mb-8 lg:mb-12">
      {/* Left side */}
      {isLeft ? (
        // Main content (Periode, Bedrijf, Functie) when isLeft
        <div className="flex-1 lg:text-right pt-1">
          {date && (
            <span className="text-xs lg:text-sm text-gray-400 mb-2 block font-medium">{date}</span>
          )}
          <div>{mainContent}</div>
        </div>
      ) : (
        // Expand content when !isLeft
        expandContent ? (
          <div className="flex-1 pt-1 lg:text-right">
            {expandContent(false)}
          </div>
        ) : (
          <div className="flex-1 hidden lg:block"></div>
        )
      )}
      
      {/* Timeline line and dot */}
      <div className="relative flex-shrink-0 w-4 lg:w-5">
        {/* Timeline dot */}
        <div 
          className="relative w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center bg-white z-10"
          style={{ 
            borderColor: 'var(--color-accent)'
          }}
        >
          <div 
            className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </div>
        {/* Timeline line - extends from bottom of dot to next item, filling the entire gap */}
        {!isLast && (
          <div 
            className="absolute left-1/2 -translate-x-1/2 top-full w-[2px] h-12 lg:h-16" 
            style={{ 
              backgroundColor: 'var(--color-accent-light)',
              marginTop: '0.25rem'
            }}
          />
        )}
      </div>
      
      {/* Right side */}
      {isLeft ? (
        // Expand content when isLeft
        expandContent ? (
          <div className="flex-1 pt-1">
            {expandContent(true)}
          </div>
        ) : (
          <div className="flex-1 hidden lg:block"></div>
        )
      ) : (
        // Main content (Periode, Bedrijf, Functie) when !isLeft
        <div className="flex-1 pt-1">
          {date && (
            <span className="text-xs lg:text-sm text-gray-400 mb-2 block font-medium">{date}</span>
          )}
          <div>{mainContent}</div>
        </div>
      )}
    </div>
  );
}

export function MinimalistTemplate({ user }: MinimalistTemplateProps) {
  const location = user.address ? [user.address.city, user.address.country].filter(Boolean).join(", ") : null;
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const workExpCount = user.workExperiences?.length || 0;
  const certCount = user.certifications?.length || 0;

  // Work experience timeline items
  const workTimelineItems: Array<{
    id: string;
    date?: string;
    mainContent: React.ReactNode;
    expandContent?: (isLeft: boolean) => React.ReactNode;
  }> = [];

  user.workExperiences?.forEach((exp) => {
    workTimelineItems.push({
      id: `work-${exp.id}`,
      date: `${formatDate(exp.startDate)} - ${exp.current ? "Heden" : formatDate(exp.endDate)}`,
      mainContent: (
        <div>
          <h3 className="font-semibold text-gray-900 text-sm lg:text-base lg:text-lg mb-1">{exp.company}</h3>
          {exp.role && <p className="text-xs lg:text-sm text-gray-500">{exp.role}</p>}
        </div>
      ),
      expandContent: exp.description ? () => (
        <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">{exp.description}</p>
      ) : undefined
    });
  });


  return (
    <main className="min-h-[100dvh] bg-white">
      {/* Mobile */}
      <div className="lg:hidden px-5 py-8 space-y-6">
        <FadeIn>
          <div className="flex items-start gap-4">
            {user.profilePicture && (
              <Image src={user.profilePicture} alt={user.naam} width={80} height={80} className="w-20 h-20 rounded-lg object-cover border border-black" />
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900 underline">{user.naam}</h1>
              {user.companyName && <p className="text-sm text-gray-600 mt-1">{user.companyName}</p>}
            </div>
          </div>
        </FadeIn>

        {user.bio && (
          <FadeInUp delay={0.05}>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-2">Bio:</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{user.bio}</p>
              {(workExpCount > 0 || certCount > 0) && (
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  {workExpCount > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                        <Briefcase className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{workExpCount}+</p>
                        <p className="text-xs text-gray-600">Werkervaring</p>
                      </div>
                    </div>
                  )}
                  {certCount > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                        <Award className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{certCount}+</p>
                        <p className="text-xs text-gray-600">Certificeringen</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FadeInUp>
        )}

        {/* Work Experience Timeline - Mobile */}
        {workTimelineItems.length > 0 && (
          <FadeInUp delay={0.2}>
            <div>
              <SectionTitle>Werkervaring</SectionTitle>
              <div className="space-y-4">
                {workTimelineItems.map((item, index) => (
                  <div key={item.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--color-accent-light)' }}>
                    {item.date && (
                      <span className="text-xs text-gray-400 mb-2 block font-medium">{item.date}</span>
                    )}
                    {item.mainContent}
                    {item.expandContent && (
                      <div className="mt-2">{item.expandContent(false)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Education */}
        {user.educations?.length > 0 && (
          <FadeInUp delay={0.25}>
            <div>
              <SectionTitle>Opleiding</SectionTitle>
              <div className="space-y-3">
                {user.educations.map((edu) => (
                  <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--color-accent-light)' }}>
                    <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                    <p className="text-sm text-gray-500">{edu.degree}{edu.field && ` - ${edu.field}`}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Certifications */}
        {user.certifications?.length > 0 && (
          <FadeInUp delay={0.3}>
            <div>
              <SectionTitle>Cursussen</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {user.certifications.map((cert) => (
                  <span key={cert.id} className="rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: 'var(--color-accent-light)' }}>{cert.name}</span>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Neem Contact Op - At the bottom */}
        <FadeInUp delay={0.35}>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>Neem Contact Op</h3>
            <div className="space-y-3">
              {user.companyEmail && (
                <a href={`mailto:${user.companyEmail}`} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <Mail className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm text-gray-700">{user.companyEmail}</span>
                </a>
              )}
              {user.linkedinUrl && (
                <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <Linkedin className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm text-gray-700">LinkedIn Profiel</span>
                </a>
              )}
              {user.phoneNumber && (
                <a href={`tel:${user.phoneNumber}`} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <Phone className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm text-gray-700">{user.phoneNumber}</span>
                </a>
              )}
            </div>
          </div>
        </FadeInUp>
      </div>

      {/* Desktop - Vertically Oriented */}
      <div className="hidden lg:block max-w-4xl mx-auto px-8 py-12">
        {/* Header Section - Like the image */}
        <FadeIn>
          <div className="flex items-start gap-8 mb-12">
            {/* Left: Photo */}
            <div className="flex-shrink-0">
              {user.profilePicture ? (
                <Image 
                  src={user.profilePicture} 
                  alt={user.naam} 
                  width={200} 
                  height={200} 
                  className="w-48 h-48 object-cover border-2 border-black grayscale" 
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 border-2 border-black flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">{user.naam.charAt(0)}</span>
                </div>
              )}
              {/* Name and Title below photo */}
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-gray-900 underline">{user.naam}</h1>
                {user.companyName && (
                  <div className="mt-2 space-y-1">
                    <p className="text-base text-gray-700">{user.companyName}</p>
                    {user.workExperiences?.[0]?.role && (
                      <p className="text-sm text-gray-600">{user.workExperiences[0].role}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Bio */}
            {user.bio && (
              <div className="flex-1 pt-2">
                <p className="text-sm font-bold text-gray-900 mb-2">Bio:</p>
                <p className="text-base text-gray-700 leading-relaxed mb-4">{user.bio}</p>
                {(workExpCount > 0 || certCount > 0) && (
                  <div className="flex gap-6 pt-4 border-t border-gray-200">
                    {workExpCount > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          <Briefcase className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-gray-900">{workExpCount}+</p>
                          <p className="text-sm text-gray-600">Werkervaring</p>
                        </div>
                      </div>
                    )}
                    {certCount > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          <Award className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-gray-900">{certCount}+</p>
                          <p className="text-sm text-gray-600">Certificeringen</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Contact Buttons - Prominent CTA */}
        <FadeInUp delay={0.05}>
          <div className="mb-12">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Neem Contact Op</h3>
            <div className="flex gap-4 flex-wrap">
              {user.companyEmail && (
                <a href={`mailto:${user.companyEmail}`} className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all hover:opacity-90 hover:scale-105" style={{ backgroundColor: 'var(--color-accent)', color: 'white' }} aria-label="Email">
                  <Mail className="w-5 h-5" />
                  Email
                </a>
              )}
              {user.linkedinUrl && (
                <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 border-2 transition-all hover:opacity-90 hover:scale-105" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }} aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              )}
              {user.phoneNumber && (
                <a href={`tel:${user.phoneNumber}`} className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 border-2 transition-all hover:opacity-90 hover:scale-105" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }} aria-label="Telefoonnummer">
                  <Phone className="w-5 h-5" />
                  Telefoonnummer
                </a>
              )}
            </div>
          </div>
        </FadeInUp>

        {/* Work Experience Timeline - Vertical, Centered */}
        {workTimelineItems.length > 0 && (
          <FadeInUp delay={0.1}>
            <div className="mb-12">
              <SectionTitle>Werkervaring</SectionTitle>
              <div className="max-w-4xl mx-auto relative">
                {workTimelineItems.map((item, index) => (
                  <VerticalTimelineItem
                    key={item.id}
                    date={item.date}
                    isLeft={index % 2 === 0}
                    isFirst={index === 0}
                    isLast={index === workTimelineItems.length - 1}
                    mainContent={item.mainContent}
                    expandContent={item.expandContent}
                  />
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Education */}
        {user.educations?.length > 0 && (
          <FadeInUp delay={0.15}>
            <div className="mb-12">
              <SectionTitle>Opleiding</SectionTitle>
              <div className="space-y-5">
                {user.educations.map((edu) => (
                  <div key={edu.id} className="border-l-2 pl-6" style={{ borderColor: 'var(--color-accent-light)' }}>
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                        <p className="text-gray-600 mt-1">{edu.degree}{edu.field && ` - ${edu.field}`}</p>
                      </div>
                      {(edu.startDate || edu.endDate) && <span className="text-xs text-gray-400">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Certifications */}
        {user.certifications?.length > 0 && (
          <FadeInUp delay={0.2}>
            <div className="mb-12">
              <SectionTitle>Cursussen</SectionTitle>
              <div className="space-y-4">
                {user.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      {cert.issuer && <p className="text-sm text-gray-500 mt-1">{cert.issuer}</p>}
                    </div>
                    {(cert.startDate || cert.endDate) && (
                      <span className="text-xs text-gray-400">
                        {formatDate(cert.startDate)}{cert.endDate && ` - ${formatDate(cert.endDate)}`}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Contact Info */}
        {(user.kvkNumber || location || user.companyEmail) && (
          <FadeInUp delay={0.25}>
            <div className="pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-6 text-sm">
                {user.kvkNumber && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">KvK</p>
                    <p className="font-medium">{user.kvkNumber}</p>
                  </div>
                )}
                {location && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">Locatie</p>
                    <p className="font-medium">{location}</p>
                  </div>
                )}
                {user.companyEmail && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">Email</p>
                    <a href={`mailto:${user.companyEmail}`} className="font-medium hover:underline">{user.companyEmail}</a>
                  </div>
                )}
              </div>
            </div>
          </FadeInUp>
        )}
      </div>
    </main>
  );
}
