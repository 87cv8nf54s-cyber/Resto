"use client";

import Image from "next/image";
import type { User } from "@/types/user";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Mail, Linkedin, MapPin, ExternalLink, Briefcase, GraduationCap, Award, Calendar, Building2, BookOpen, Phone } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";

interface BusinessTemplateProps {
  user: User;
}

export function BusinessTemplate({ user }: BusinessTemplateProps) {
  const location = user.address ? [user.address.city, user.address.country].filter(Boolean).join(", ") : null;
  const workExpCount = user.workExperiences?.length || 0;
  const certCount = user.certifications?.length || 0;

  return (
    <main className="min-h-[100dvh] bg-white">
      {/* Mobile */}
      <div className="lg:hidden px-5 py-6 space-y-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-4">
            {user.profilePicture && (
              <Image src={user.profilePicture} alt={user.naam} width={80} height={80} className="w-20 h-20 rounded-full object-cover" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.naam}</h1>
              {user.companyName && (
                <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{user.companyName.toUpperCase()}</p>
              )}
            </div>
          </div>
        </FadeIn>

        <FadeInUp delay={0.05}>
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            {user.companyEmail && (
              <a href={`mailto:${user.companyEmail}`} className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>{user.companyEmail}</span>
              </a>
            )}
            {user.phoneNumber && (
              <a href={`tel:${user.phoneNumber}`} className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                <span>Portfolio</span>
              </a>
            )}
            {user.linkedinUrl && (
              <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <Linkedin className="w-4 h-4" />
                <span>{user.naam}</span>
              </a>
            )}
          </div>
        </FadeInUp>

        {user.bio && (
          <FadeInUp delay={0.1}>
            <div className="bg-gray-100 rounded-xl p-4">
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

        {(user.companyName || user.kvkNumber || location) && (
          <FadeInUp delay={0.12}>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Bedrijfsgegevens</h3>
              <div className="space-y-2 text-sm">
                {user.companyName && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{user.companyName}</span>
                  </div>
                )}
                {user.kvkNumber && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">KvK: {user.kvkNumber}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{location}</span>
                  </div>
                )}
              </div>
            </div>
          </FadeInUp>
        )}

        {user.workExperiences?.length > 0 && (
          <FadeInUp delay={0.15}>
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-accent)' }}>ERVARING</h2>
              <div className="space-y-6">
                {user.workExperiences.map((exp) => (
                  <div key={exp.id} className="space-y-3 pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-semibold" style={{ color: '#1e40af' }}>{exp.role || exp.company}</h3>
                      <div className="flex flex-col items-end gap-1 text-xs text-gray-500 flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(exp.startDate)} - {exp.current ? "Heden" : formatDate(exp.endDate)}</span>
                        </div>
                      </div>
                    </div>
                    {exp.description && (
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                        {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                          <li key={idx}>{line.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {user.educations?.length > 0 && (
          <FadeInUp delay={0.2}>
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-accent)' }}>OPLEIDING</h2>
              <div className="space-y-4">
                {user.educations.map((edu) => (
                  <div key={edu.id} className="pb-3 border-b border-gray-200 last:border-0">
                    <h3 className="text-base font-semibold mb-1" style={{ color: '#1e40af' }}>{edu.degree}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <BookOpen className="w-3 h-3" />
                      <span>{edu.institution}</span>
                      {(edu.startDate || edu.endDate) && (
                        <>
                          <Calendar className="w-3 h-3 ml-2" />
                          <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {user.certifications?.length > 0 && (
          <FadeInUp delay={0.25}>
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-accent)' }}>VAARDIGHEDEN</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: '#1e40af' }}>Certificeringen</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.certifications.map((cert) => (
                      <span key={cert.id} className="bg-gray-100 px-3 py-1.5 rounded-lg text-sm text-gray-700">
                        {cert.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        )}

        <FadeInUp delay={0.3}>
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
                  <span className="text-sm text-gray-700">Telefoonnummer</span>
                </a>
              )}
            </div>
          </div>
        </FadeInUp>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        {/* Hero Section */}
        <FadeIn>
          <div className="bg-gradient-to-br from-gray-50 to-white py-20 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-12">
                <div className="flex-shrink-0">
                  {user.profilePicture ? (
                    <Image src={user.profilePicture} alt={user.naam} width={200} height={200} className="w-48 h-48 rounded-full object-cover shadow-xl" />
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-6xl font-bold shadow-xl" style={{ color: 'var(--color-accent)' }}>
                      {user.naam.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-5xl font-bold text-gray-900 mb-3">{user.naam}</h1>
                  {user.companyName && (
                    <p className="text-2xl font-medium mb-6" style={{ color: 'var(--color-accent)' }}>{user.companyName.toUpperCase()}</p>
                  )}
                  {user.bio && (
                    <div className="mb-6 max-w-2xl">
                      <p className="text-lg text-gray-600 leading-relaxed mb-4">{user.bio}</p>
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
                  <div className="flex flex-wrap gap-4">
                    {user.companyEmail && (
                      <a href={`mailto:${user.companyEmail}`} className="px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md" style={{ backgroundColor: 'var(--color-accent)' }}>
                        <Mail className="w-5 h-5" />
                        <span>Contact</span>
                      </a>
                    )}
                    {user.linkedinUrl && (
                      <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border-2 font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {user.phoneNumber && (
                      <a href={`tel:${user.phoneNumber}`} className="px-6 py-3 rounded-lg border-2 font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                        <Phone className="w-5 h-5" />
                        <span>Telefoonnummer</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* Header Section */}
          <FadeIn>
            <div className="flex items-start gap-6 mb-10">
              <div className="flex-1">
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                  {user.companyEmail && (
                    <a href={`mailto:${user.companyEmail}`} className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
                      <Mail className="w-4 h-4" />
                      <span>{user.companyEmail}</span>
                    </a>
                  )}
                  {user.phoneNumber && (
                    <a href={`tel:${user.phoneNumber}`} className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>Portfolio</span>
                    </a>
                  )}
                  {user.linkedinUrl && (
                    <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
                      <Linkedin className="w-4 h-4" />
                      <span>{user.naam}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>


        <div className="grid grid-cols-3 gap-10">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-10">
            {user.workExperiences?.length > 0 && (
              <FadeInUp delay={0.1}>
                <div>
                  <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-accent)' }}>ERVARING</h2>
                  <div className="space-y-10">
                    {user.workExperiences.map((exp) => (
                      <div key={exp.id} className="space-y-4 pb-8 border-b border-gray-200 last:border-0">
                        <div className="flex items-start justify-between gap-6">
                          <h3 className="text-xl font-semibold" style={{ color: '#1e40af' }}>{exp.role || exp.company}</h3>
                          <div className="flex flex-col items-end gap-2 text-sm text-gray-500 flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              <span>{exp.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(exp.startDate)} - {exp.current ? "Heden" : formatDate(exp.endDate)}</span>
                            </div>
                          </div>
                        </div>
                        {exp.description && (
                          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
                            {exp.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                              <li key={idx} className="leading-relaxed">{line.trim()}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            )}

            {user.educations?.length > 0 && (
              <FadeInUp delay={0.2}>
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-accent)' }}>OPLEIDING</h2>
                  <div className="space-y-6">
                    {user.educations.map((edu) => (
                      <div key={edu.id} className="pb-4 border-b border-gray-200 last:border-0">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: '#1e40af' }}>{edu.degree}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <BookOpen className="w-4 h-4" />
                          <span>{edu.institution}</span>
                          {(edu.startDate || edu.endDate) && (
                            <>
                              <Calendar className="w-4 h-4 ml-2" />
                              <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                            </>
                          )}
                        </div>
                        {edu.field && (
                          <p className="text-sm text-gray-600 mt-1">{edu.field}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Company Details */}
            {(user.companyName || user.kvkNumber || location) && (
              <FadeInUp delay={0.12}>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Bedrijfsgegevens</h3>
                  <div className="space-y-3 text-sm">
                    {user.companyName && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{user.companyName}</span>
                      </div>
                    )}
                    {user.kvkNumber && (
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">KvK: {user.kvkNumber}</span>
                      </div>
                    )}
                    {location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </FadeInUp>
            )}

            {/* Skills Section */}
            {user.certifications?.length > 0 && (
              <FadeInUp delay={0.15}>
                <div>
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-accent)' }}>VAARDIGHEDEN</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold mb-3" style={{ color: '#1e40af' }}>Certificeringen</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.certifications.map((cert) => (
                          <div key={cert.id} className="bg-gray-100 px-3 py-2 rounded-lg">
                            <p className="text-sm font-medium text-gray-700">{cert.name}</p>
                            {cert.issuer && (
                              <p className="text-xs text-gray-500 mt-1">{cert.issuer}</p>
                            )}
                            {(cert.startDate || cert.endDate) && (
                              <p className="text-xs text-gray-400 mt-1">
                                {formatDate(cert.startDate)}{cert.endDate && ` - ${formatDate(cert.endDate)}`}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            )}

            {/* Contact Section */}
            <FadeInUp delay={0.25}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>Neem Contact Op</h3>
                <div className="space-y-3">
                  {user.companyEmail && (
                    <a href={`mailto:${user.companyEmail}`} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all group">
                      <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                      <span className="text-sm text-gray-700">{user.companyEmail}</span>
                    </a>
                  )}
                  {user.linkedinUrl && (
                    <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all group">
                      <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                      <span className="text-sm text-gray-700">LinkedIn Profiel</span>
                    </a>
                  )}
                  {user.phoneNumber && (
                    <a href={`tel:${user.phoneNumber}`} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all group">
                      <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                      <span className="text-sm text-gray-700">Telefoonnummer</span>
                    </a>
                  )}
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
