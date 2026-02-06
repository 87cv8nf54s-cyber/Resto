"use client";

import Image from "next/image";
import type { User } from "@/types/user";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Mail, Linkedin, ExternalLink, MapPin, Phone, Briefcase, Smile, Award, Download } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";

interface PortfolioTemplateProps {
  user: User;
}

function AbstractShape({ className = "", color = "var(--color-accent)" }: { className?: string; color?: string }) {
  return (
    <div 
      className={`absolute rounded-full opacity-20 ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}

export function PortfolioTemplate({ user }: PortfolioTemplateProps) {
  const location = user.address ? [user.address.city, user.address.country].filter(Boolean).join(", ") : null;
  const workExpCount = user.workExperiences?.length || 0;
  const certCount = user.certifications?.length || 0;

  return (
    <main className="min-h-[100dvh] bg-[#F5F5F0]">
      {/* Mobile */}
      <div className="lg:hidden p-6 space-y-8">
        {/* Hero Section */}
        <FadeInUp delay={0.05}>
          <div className="relative overflow-hidden rounded-3xl p-6 bg-white">
            <AbstractShape className="w-48 h-48 -top-24 -right-24" color="var(--color-accent)" />
            <AbstractShape className="w-32 h-32 -top-16 -right-16" color="var(--color-accent-dark)" />
            
            <div className="relative space-y-4">
              {user.companyName && (
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">{user.companyName}</p>
              )}
              <h1 className="text-4xl font-serif font-bold text-[#25282B] leading-tight">{user.naam.toUpperCase()}</h1>
              {user.workExperiences?.[0]?.role && (
                <p className="text-base font-medium text-gray-600">{user.workExperiences[0].role}</p>
              )}
              
              {user.profilePicture && (
                <div className="relative mt-4">
                  <Image 
                    src={user.profilePicture} 
                    alt={user.naam} 
                    width={200} 
                    height={200} 
                    className="rounded-2xl object-cover w-full max-w-xs mx-auto shadow-lg" 
                  />
                </div>
              )}
              
              <div className="flex gap-3 pt-2">
                {user.companyEmail && (
                  <a href={`mailto:${user.companyEmail}`} className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                )}
                {user.linkedinUrl && (
                  <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                )}
                {user.phoneNumber && (
                  <a href={`tel:${user.phoneNumber}`} className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <Phone className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* About Me */}
        {user.bio && (
          <FadeInUp delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl p-6 bg-white">
              <AbstractShape className="w-40 h-40 -bottom-20 -left-20" color="var(--color-accent-light)" />
              <div className="relative">
                <h2 className="text-3xl font-serif font-bold text-[#25282B] mb-4">About Me</h2>
                <p className="text-base text-gray-700 leading-relaxed mb-6">{user.bio}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                      <Briefcase className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#25282B]">{workExpCount}+</p>
                      <p className="text-sm text-gray-600">Werkervaring</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                      <Smile className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#25282B]">{certCount}+</p>
                      <p className="text-sm text-gray-600">Certificeringen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Work Experience */}
        {user.workExperiences?.length > 0 && (
          <FadeInUp delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl p-6 bg-white">
              <h2 className="text-3xl font-serif font-bold text-[#25282B] mb-6">Werkervaring</h2>
              <div className="space-y-6">
                {user.workExperiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 pl-4" style={{ borderLeftColor: 'var(--color-accent)' }}>
                    <h3 className="text-xl font-bold text-[#25282B] mb-1">{exp.company}</h3>
                    {exp.role && <p className="text-base text-gray-600 mb-2">{exp.role}</p>}
                    <p className="text-sm text-gray-500">{formatDate(exp.startDate)} - {exp.current ? "Heden" : formatDate(exp.endDate)}</p>
                    {exp.description && <p className="text-sm text-gray-700 mt-2 leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Education */}
        {user.educations?.length > 0 && (
          <FadeInUp delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl p-6 bg-white">
              <h2 className="text-3xl font-serif font-bold text-[#25282B] mb-6">Opleiding</h2>
              <div className="space-y-4">
                {user.educations.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-lg font-bold text-[#25282B] mb-1">{edu.institution}</h3>
                    <p className="text-base text-gray-600">{edu.degree}{edu.field && ` - ${edu.field}`}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-sm text-gray-500 mt-1">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Certifications */}
        {user.certifications?.length > 0 && (
          <FadeInUp delay={0.25}>
            <div className="relative overflow-hidden rounded-3xl p-6 bg-white">
              <h2 className="text-3xl font-serif font-bold text-[#25282B] mb-6">Certificeringen</h2>
              <div className="space-y-3">
                {user.certifications.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <h3 className="text-base font-bold text-[#25282B] mb-1">{cert.name}</h3>
                    {cert.issuer && <p className="text-sm text-gray-600">{cert.issuer}</p>}
                    {(cert.startDate || cert.endDate) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(cert.startDate)}{cert.endDate && ` - ${formatDate(cert.endDate)}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Neem Contact Op - At the bottom */}
        <FadeInUp delay={0.3}>
          <div className="relative overflow-hidden rounded-3xl p-6 bg-white">
            <AbstractShape className="w-40 h-40 -bottom-20 -right-20" color="var(--color-accent-light)" />
            <div className="relative">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>Neem Contact Op</h3>
              <div className="space-y-3">
                {user.companyEmail && (
                  <a href={`mailto:${user.companyEmail}`} className="flex items-center gap-3 p-3 rounded-lg hover:shadow-md transition-shadow" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <Mail className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm text-gray-700">{user.companyEmail}</span>
                  </a>
                )}
                {user.linkedinUrl && (
                  <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:shadow-md transition-shadow" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <Linkedin className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm text-gray-700">LinkedIn Profiel</span>
                  </a>
                )}
                {user.phoneNumber && (
                  <a href={`tel:${user.phoneNumber}`} className="flex items-center gap-3 p-3 rounded-lg hover:shadow-md transition-shadow" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <Phone className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm text-gray-700">Telefoonnummer</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 py-12 space-y-8">
          {/* Row 1: Profile Picture (left) and About Me (right) */}
          <div className="grid grid-cols-2 gap-8">
            {/* Profile Picture Section */}
            <FadeInUp delay={0.05}>
              <div className="relative overflow-hidden rounded-3xl p-8 bg-white">
                <AbstractShape className="w-96 h-96 -top-48 -right-48" color="var(--color-accent)" />
                <AbstractShape className="w-80 h-80 -top-40 -right-40" color="var(--color-accent-dark)" />
                
                <div className="relative space-y-4">
                  {user.companyName && (
                    <p className="text-base font-semibold uppercase tracking-wider text-gray-600">{user.companyName}</p>
                  )}
                  <h1 className="text-5xl font-serif font-bold text-[#25282B] leading-tight">{user.naam.toUpperCase()}</h1>
                  {user.workExperiences?.[0]?.role && (
                    <p className="text-lg font-medium text-gray-600">{user.workExperiences[0].role}</p>
                  )}
                  
                  {user.profilePicture && (
                    <div className="relative mt-4">
                      <Image 
                        src={user.profilePicture} 
                        alt={user.naam} 
                        width={200} 
                        height={200} 
                        className="rounded-2xl object-cover w-full max-w-[200px] shadow-xl" 
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-3 pt-2">
                    {user.companyEmail && (
                      <a href={`mailto:${user.companyEmail}`} className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {user.linkedinUrl && (
                      <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {user.phoneNumber && (
                      <a href={`tel:${user.phoneNumber}`} className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                        <Phone className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                  
                  {/* Key Stats */}
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
                    {location && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Locatie</p>
                        <p className="text-base font-semibold text-[#25282B]">{location}</p>
                      </div>
                    )}
                    {workExpCount > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Ervaring</p>
                        <p className="text-base font-semibold text-[#25282B]">{workExpCount}+ Jaar</p>
                      </div>
                    )}
                    {user.kvkNumber && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">KvK</p>
                        <p className="text-base font-semibold text-[#25282B]">{user.kvkNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* About Me */}
            {user.bio && (
              <FadeInUp delay={0.1}>
                <div className="relative overflow-hidden rounded-3xl p-8 bg-white">
                  <AbstractShape className="w-64 h-64 -bottom-32 -left-32" color="var(--color-accent-light)" />
                  <div className="relative grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                      <h2 className="text-4xl font-serif font-bold text-[#25282B] mb-6">About Me</h2>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">{user.bio}</p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          <Briefcase className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <p className="text-3xl font-bold text-[#25282B]">{workExpCount}+</p>
                        <p className="text-sm text-gray-600">Projecten</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          <Smile className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <p className="text-3xl font-bold text-[#25282B]">{certCount}+</p>
                        <p className="text-sm text-gray-600">Certificeringen</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          <Award className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <p className="text-3xl font-bold text-[#25282B]">{certCount}</p>
                        <p className="text-sm text-gray-600">Awards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            )}
          </div>

          {/* Row 2: Education + Cursussen (left) and Werkervaring (right) */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Education + Cursussen */}
            <div className="space-y-8">
              {/* Education */}
              {user.educations?.length > 0 && (
                <FadeInUp delay={0.15}>
                  <div className="rounded-3xl p-8 bg-white">
                    <h3 className="text-2xl font-serif font-bold text-[#25282B] mb-6">Education</h3>
                    <div className="space-y-6">
                      {user.educations.map((edu) => (
                        <div key={edu.id} className="border-l-4 pl-4" style={{ borderLeftColor: 'var(--color-accent)' }}>
                          <p className="text-sm text-gray-500 mb-1">
                            {edu.startDate && formatDate(edu.startDate)} - {edu.endDate && formatDate(edu.endDate)}
                          </p>
                          <h4 className="text-lg font-bold text-[#25282B] mb-1">{edu.institution}</h4>
                          <p className="text-base text-gray-600">{edu.degree}</p>
                          {edu.field && <p className="text-sm text-gray-500 mt-1">{edu.field}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInUp>
              )}

              {/* Cursussen */}
              {user.certifications?.length > 0 && (
                <FadeInUp delay={0.2}>
                  <div className="rounded-3xl p-8 bg-white">
                    <h3 className="text-2xl font-serif font-bold text-[#25282B] mb-6">Cursussen</h3>
                    <div className="space-y-4">
                      {user.certifications.map((cert) => (
                        <div key={cert.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          <h4 className="text-base font-bold text-[#25282B] mb-1">{cert.name}</h4>
                          {cert.issuer && <p className="text-sm text-gray-600 mb-1">{cert.issuer}</p>}
                          {(cert.startDate || cert.endDate) && (
                            <p className="text-xs text-gray-500">
                              {formatDate(cert.startDate)}{cert.endDate && ` - ${formatDate(cert.endDate)}`}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInUp>
              )}
            </div>

            {/* Right Column: Werkervaring */}
            {user.workExperiences?.length > 0 && (
              <FadeInUp delay={0.15}>
                <div className="relative overflow-hidden rounded-3xl p-8 bg-white">
                  <AbstractShape className="w-64 h-64 -bottom-32 -right-32" color="var(--color-accent)" />
                  <div className="relative">
                    <h2 className="text-4xl font-serif font-bold text-[#25282B] mb-8">Werkervaring</h2>
                    <div className="space-y-8">
                      {user.workExperiences.map((exp, index) => (
                        <div key={exp.id}>
                          <h3 className="text-2xl font-serif font-bold text-[#25282B] mb-2">{exp.company}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {exp.role && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                                {exp.role}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{formatDate(exp.startDate)} - {exp.current ? "Heden" : formatDate(exp.endDate)}</p>
                          {exp.description && (
                            <p className="text-base text-gray-700 leading-relaxed">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInUp>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

