"use client";

import Image from "next/image";
import type { User } from "@/types/user";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Mail, Linkedin, Phone, User as UserIcon, Briefcase, Award, GraduationCap } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";

interface CreativeTemplateProps {
  user: User;
}

export function CreativeTemplate({ user }: CreativeTemplateProps) {
  const [firstName, ...lastNameParts] = (user.naam ?? "").split(" ");
  const lastName = lastNameParts.join(" ");
  const location = user.address ? [user.address.city, user.address.country].filter(Boolean).join(", ") : null;
  const workExpCount = user.workExperiences?.length || 0;
  const certCount = user.certifications?.length || 0;
  const eduCount = user.educations?.length || 0;

  return (
    <main className="min-h-[100dvh] bg-[#F9FAFF]">
      {/* Mobile */}
      <div className="lg:hidden">
        {/* Hero Section */}
        <FadeInUp delay={0.05}>
          <div className="px-6 py-12 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-30" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            
            <div className="relative space-y-6">
              {user.companyName && (
                <p className="text-base font-bold uppercase" style={{ color: 'var(--color-accent)' }}>{user.companyName}</p>
              )}
              <h2 className="text-4xl sm:text-5xl font-bold text-[#25282B] leading-tight">
                Hello, my name is {user.naam}
              </h2>
              {user.bio && (
                <div>
                  <p className="text-lg text-[#828282] leading-relaxed mb-4">{user.bio}</p>
                  {(workExpCount > 0 || certCount > 0 || eduCount > 0) && (
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-[#E0E0E0]">
                      {workExpCount > 0 && (
                        <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <Briefcase className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-lg font-bold text-[#25282B]">{workExpCount}+</p>
                            <p className="text-xs text-[#828282]">Werkervaring</p>
                          </div>
                        </div>
                      )}
                      {certCount > 0 && (
                        <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <Award className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-lg font-bold text-[#25282B]">{certCount}+</p>
                            <p className="text-xs text-[#828282]">Certificeringen</p>
                          </div>
                        </div>
                      )}
                      {eduCount > 0 && (
                        <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                            <GraduationCap className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-lg font-bold text-[#25282B]">{eduCount}+</p>
                            <p className="text-xs text-[#828282]">Educaties</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Profile Picture with decorative background */}
              <div className="relative mt-6">
                {user.profilePicture ? (
                  <Image src={user.profilePicture} alt={user.naam} width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl" style={{ color: 'var(--color-accent)' }}>
                    {user.naam.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 pt-4">
                {user.companyEmail && (
                  <a href={`mailto:${user.companyEmail}`} className="px-6 py-3 rounded-lg text-[#25282B] font-medium text-base" style={{ backgroundColor: 'var(--color-accent)' }}>
                    Contact
                  </a>
                )}
                {user.linkedinUrl && (
                  <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg text-[#25282B] font-medium text-base border-2" style={{ borderColor: 'var(--color-accent)' }}>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeInUp>

        {user.workExperiences?.length > 0 && (
          <FadeInUp delay={0.1}>
            <div className="px-6 pb-8">
              <div className="flex flex-col items-center gap-2 mb-8">
                <h3 className="text-3xl font-bold text-center text-[#25282B]">Werkervaring</h3>
                <div className="w-16 h-1 rounded" style={{ backgroundColor: 'var(--color-accent)' }}></div>
              </div>
              <div className="space-y-6">
                {user.workExperiences.map((exp, index) => (
                  <div 
                    key={exp.id} 
                    className="bg-white rounded-3xl p-6 shadow-lg overflow-hidden border-l-4" 
                    style={{ 
                      boxShadow: '0px 6px 64px rgba(112, 144, 176, 0.10)',
                      borderLeftColor: 'var(--color-accent)'
                    }}
                  >
                    <h4 className="text-2xl font-bold text-[#25282B] mb-2">{exp.company}</h4>
                    {exp.role && (
                      <div className="mb-3 px-4 py-2 rounded-lg inline-block" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                        <p className="text-base font-semibold text-[#25282B]">{exp.role}</p>
                      </div>
                    )}
                    <p className="text-sm text-[#828282] mb-3">{formatDate(exp.startDate)} - {exp.current ? "Heden" : formatDate(exp.endDate)}</p>
                    {exp.description && (
                      <p className="text-base text-[#828282] leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {user.educations?.length > 0 && (
          <FadeInUp delay={0.15}>
            <div className="px-6 pb-8">
              <div className="flex flex-col items-center gap-2 mb-8">
                <h3 className="text-3xl font-bold text-center text-[#25282B]">Opleiding</h3>
                <div className="w-16 h-1 rounded" style={{ backgroundColor: 'var(--color-accent)' }}></div>
              </div>
              <div className="space-y-4">
                {user.educations.map((edu, index) => (
                  <div 
                    key={edu.id} 
                    className={`rounded-3xl p-6 shadow-lg ${index % 2 === 0 ? 'bg-white' : ''}`} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? 'white' : 'var(--color-accent-light)',
                      boxShadow: '0px 6px 64px rgba(112, 144, 176, 0.10)' 
                    }}
                  >
                    <h4 className="text-xl font-bold text-[#25282B] mb-2">{edu.institution}</h4>
                    <p className="text-base text-[#828282] mb-1">{edu.degree}</p>
                    {edu.field && <p className="text-sm text-[#828282]">{edu.field}</p>}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-xs text-[#828282] mt-3">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Contact Section */}
        <FadeInUp delay={0.25}>
          <div className="px-6 pb-8">
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
          </div>
        </FadeInUp>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        {/* Hero Section */}
        <FadeInUp delay={0.05}>
          <div className="px-8 py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {user.companyName && (
                  <p className="text-xl font-bold uppercase" style={{ color: 'var(--color-accent)' }}>{user.companyName}</p>
                )}
                <h2 className="text-6xl font-bold text-[#25282B] leading-tight">
                  Hello, my name is {user.naam}
                </h2>
                {user.bio && (
                  <div className="max-w-lg">
                    <p className="text-2xl text-[#828282] leading-relaxed mb-6">{user.bio}</p>
                    {(workExpCount > 0 || certCount > 0 || eduCount > 0) && (
                      <div className="flex gap-6 pt-6 border-t border-[#E0E0E0]">
                        {workExpCount > 0 && (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                              <Briefcase className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-[#25282B]">{workExpCount}+</p>
                              <p className="text-sm text-[#828282]">Werkervaring</p>
                            </div>
                          </div>
                        )}
                        {certCount > 0 && (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                              <Award className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-[#25282B]">{certCount}+</p>
                              <p className="text-sm text-[#828282]">Certificeringen</p>
                            </div>
                          </div>
                        )}
                        {eduCount > 0 && (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                              <GraduationCap className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-[#25282B]">{eduCount}+</p>
                              <p className="text-sm text-[#828282]">Educaties</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex gap-3">
                  {user.companyEmail && (
                    <a href={`mailto:${user.companyEmail}`} className="px-6 py-2 rounded-lg text-lg font-medium text-[#25282B]" style={{ backgroundColor: 'var(--color-accent)' }}>
                      Contact
                    </a>
                  )}
                  {user.linkedinUrl && (
                    <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-lg text-lg font-medium text-[#25282B] border-2" style={{ borderColor: 'var(--color-accent)' }}>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
              <div className="relative">
                {user.profilePicture ? (
                  <Image src={user.profilePicture} alt={user.naam} width={720} height={629} className="relative rounded-3xl object-cover shadow-2xl w-full h-[629px]" />
                ) : (
                  <div className="w-full h-[629px] rounded-3xl flex items-center justify-center shadow-2xl" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <UserIcon className="w-64 h-64" style={{ color: 'var(--color-accent)' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Content Sections */}
        <div className="px-8 py-16 max-w-7xl mx-auto">
          {/* Werkervaring Section */}
          {user.workExperiences?.length > 0 && (
            <FadeInUp delay={0.1}>
              <div className="mb-20">
                <div className="flex flex-col items-center gap-2 mb-16">
                  <h3 className="text-5xl font-bold text-center text-[#25282B]">Werkervaring</h3>
                  <div className="w-24 h-1 rounded" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                </div>
                <div className="space-y-8">
                  {user.workExperiences.map((exp, index) => (
                    <div key={exp.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border-l-4" style={{ 
                      boxShadow: '0px 6px 64px rgba(112, 144, 176, 0.10)',
                      borderLeftColor: 'var(--color-accent)'
                    }}>
                      <div className="grid grid-cols-2">
                        <div className="p-12 flex flex-col justify-center">
                          <h4 className="text-4xl font-bold text-[#25282B] mb-6">{exp.company}</h4>
                          <p className="text-lg text-[#828282] mb-6">{exp.description || exp.role}</p>
                          <div className="flex items-center gap-2 text-sm text-[#828282]">
                            <span>{formatDate(exp.startDate)} - {exp.current ? "Heden" : formatDate(exp.endDate)}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                          {exp.role && (
                            <div className="text-center p-8">
                              <p className="text-2xl font-semibold text-[#25282B]">{exp.role}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          )}

          {/* Opleiding Section */}
          {user.educations?.length > 0 && (
            <FadeInUp delay={0.15}>
              <div className="mb-20">
                <div className="flex flex-col items-center gap-2 mb-16">
                  <h3 className="text-5xl font-bold text-center text-[#25282B]">Opleiding</h3>
                  <div className="w-24 h-1 rounded" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {user.educations.map((edu, index) => (
                    <div key={edu.id} className={`rounded-3xl p-8 shadow-lg ${index % 2 === 0 ? 'bg-white' : ''}`} style={{ 
                      backgroundColor: index % 2 === 0 ? 'white' : 'var(--color-accent-light)',
                      boxShadow: '0px 6px 64px rgba(112, 144, 176, 0.10)' 
                    }}>
                      <h4 className="text-2xl font-bold text-[#25282B] mb-3">{edu.institution}</h4>
                      <p className="text-lg text-[#828282] mb-2">{edu.degree}</p>
                      {edu.field && <p className="text-base text-[#828282]">{edu.field}</p>}
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-sm text-[#828282] mt-4">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          )}

          {/* Certificeringen Section */}
          {user.certifications?.length > 0 && (
            <FadeInUp delay={0.2}>
              <div className="mb-20">
                <div className="flex flex-col items-center gap-2 mb-16">
                  <h3 className="text-5xl font-bold text-center text-[#25282B]">Certificeringen</h3>
                  <div className="w-24 h-1 rounded" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {user.certifications.map((cert, index) => (
                    <div key={cert.id} className={`rounded-3xl p-6 shadow-lg ${index % 3 === 0 ? 'bg-white' : index % 3 === 1 ? '' : 'bg-white'}`} style={{
                      backgroundColor: index % 3 === 1 ? 'var(--color-accent-light)' : 'white',
                      boxShadow: '0px 6px 64px rgba(112, 144, 176, 0.10)'
                    }}>
                      <h4 className="text-xl font-bold text-[#25282B] mb-2">{cert.name}</h4>
                      {cert.issuer && <p className="text-sm text-[#828282]">{cert.issuer}</p>}
                      {(cert.startDate || cert.endDate) && (
                        <p className="text-xs text-[#828282] mt-2">
                          {formatDate(cert.startDate)}{cert.endDate && ` - ${formatDate(cert.endDate)}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          )}

          {/* Contact Section */}
          <FadeInUp delay={0.25}>
            <div className="flex flex-col items-center gap-8 py-16">
              <div className="flex gap-6">
                {user.companyEmail && (
                  <a href={`mailto:${user.companyEmail}`} className="w-12 h-12 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <Mail className="w-6 h-6 text-white" />
                  </a>
                )}
                {user.linkedinUrl && (
                  <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                )}
                {user.phoneNumber && (
                  <a href={`tel:${user.phoneNumber}`} className="w-12 h-12 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <Phone className="w-6 h-6 text-white" />
                  </a>
                )}
              </div>
              <p className="text-base text-[#828282]">{user.naam} {new Date().getFullYear()}</p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </main>
  );
}
