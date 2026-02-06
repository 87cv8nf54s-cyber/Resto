"use client";

import { useState } from "react";
import Image from "next/image";
import type { User } from "@/types/user";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Mail, Linkedin, MapPin, Briefcase, GraduationCap, Award, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";

interface HeroTemplateProps {
  user: User;
}

function SectionTitle({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}>
        <Icon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
      </div>
      {children}
    </h2>
  );
}

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 ${className}`} style={style}>{children}</div>;
}

export function HeroTemplate({ user }: HeroTemplateProps) {
  const location = user.address ? [user.address.city, user.address.country].filter(Boolean).join(", ") : null;
  const workExpCount = user.workExperiences?.length || 0;
  const certCount = user.certifications?.length || 0;
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Mobile */}
      <div className="lg:hidden px-5 py-8 space-y-5">
        <FadeIn>
          <div className="text-center">
            {user.profilePicture ? (
              <Image src={user.profilePicture} alt={user.naam ?? ""} width={112} height={112} className="w-28 h-28 mx-auto mb-4 rounded-full object-cover ring-4" style={{ ['--tw-ring-color' as string]: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }} />
            ) : (
              <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-slate-800 ring-4 flex items-center justify-center text-4xl" style={{ ['--tw-ring-color' as string]: 'color-mix(in srgb, var(--color-accent) 20%, transparent)', color: 'var(--color-accent)' }}>
                {user.naam?.charAt(0)}
              </div>
            )}
            <h1 className="text-2xl font-bold text-white">{user.naam}</h1>
            {user.companyName && <p className="font-medium mt-1" style={{ color: 'var(--color-accent)' }}>{user.companyName}</p>}
            {user.bio && (
              <div className="mt-3 max-w-sm mx-auto">
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{user.bio}</p>
                {(workExpCount > 0 || certCount > 0) && (
                  <div className="flex justify-center gap-4 pt-4 border-t border-slate-700">
                    {workExpCount > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}>
                          <Briefcase className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">{workExpCount}+</p>
                          <p className="text-xs text-slate-400">Werkervaring</p>
                        </div>
                      </div>
                    )}
                    {certCount > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}>
                          <Award className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">{certCount}+</p>
                          <p className="text-xs text-slate-400">Certificeringen</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {(user.kvkNumber || location) && (
              <div className="flex justify-center gap-4 mt-3 text-xs text-slate-400">
                {user.kvkNumber && <span>KvK: {user.kvkNumber}</span>}
                {location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{location}</span>}
              </div>
            )}
            <div className="flex gap-3 mt-5 flex-wrap">
              {user.companyEmail && (
                <a href={`mailto:${user.companyEmail}`} className="flex-1 min-w-[100px] text-white rounded-full py-3 text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98]" style={{ backgroundColor: 'var(--color-accent)' }}>
                  <Mail className="w-4 h-4" /> Contact
                </a>
              )}
              {user.linkedinUrl && (
                <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[100px] border border-slate-600 text-white rounded-full py-3 text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98]">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {user.phoneNumber && (
                <a href={`tel:${user.phoneNumber}`} className="flex-1 min-w-[100px] border border-slate-600 text-white rounded-full py-3 text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98]">
                  <Phone className="w-4 h-4" /> Telefoonnummer
                </a>
              )}
            </div>
          </div>
        </FadeIn>

        {user.workExperiences?.length > 0 && (
          <FadeInUp delay={0.1}>
            <Card>
              <SectionTitle icon={Briefcase}>Werkervaring</SectionTitle>
              <div className="space-y-4">
                {user.workExperiences.map((exp) => {
                  const isExpanded = expandedItems[`work-${exp.id}`] || false;
                  return (
                    <div key={exp.id} className="border-b border-slate-700/50 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between gap-2 items-start">
                        <div className="flex-1">
                          <div className="flex justify-between gap-2 items-center mb-1">
                            <h3 className="font-bold text-white">{exp.company}</h3>
                            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">{formatDate(exp.startDate)} - {exp.current ? "Heden" : formatDate(exp.endDate)}</span>
                          </div>
                          {exp.role && <p className="text-sm" style={{ color: 'var(--color-accent)' }}>{exp.role}</p>}
                        </div>
                        {exp.description && (
                          <button
                            onClick={() => toggleItem(`work-${exp.id}`)}
                            className="flex items-center justify-center w-6 h-6 text-slate-400 hover:text-white transition-colors ml-2 flex-shrink-0"
                            aria-label={isExpanded ? "Beschrijving verbergen" : "Beschrijving tonen"}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        )}
                      </div>
                      {exp.description && isExpanded && (
                        <div className="mt-3 animate-in fade-in duration-200">
                          <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </FadeInUp>
        )}

        {user.educations?.length > 0 && (
          <FadeInUp delay={0.15}>
            <Card>
              <SectionTitle icon={GraduationCap}>Opleiding</SectionTitle>
              <div className="space-y-3">
                {user.educations.map((edu) => (
                  <div key={edu.id} className="border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-white">{edu.institution}</h3>
                    <p className="text-sm opacity-80" style={{ color: 'var(--color-accent)' }}>{edu.degree}{edu.field && ` - ${edu.field}`}</p>
                  </div>
                ))}
              </div>
            </Card>
          </FadeInUp>
        )}

        {user.certifications?.length > 0 && (
          <FadeInUp delay={0.2}>
            <Card>
              <SectionTitle icon={Award}>Certificeringen</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {user.certifications.map((cert) => (
                  <span key={cert.id} className="bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-white">{cert.name}</span>
                ))}
              </div>
            </Card>
          </FadeInUp>
        )}

        <FadeInUp delay={0.3}>
          <div className="px-5 pb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold mb-4 text-white">Neem Contact Op</h3>
              <div className="space-y-3">
                {user.companyEmail && (
                  <a href={`mailto:${user.companyEmail}`} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <Mail className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm text-slate-300">{user.companyEmail}</span>
                  </a>
                )}
                {user.linkedinUrl && (
                  <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <Linkedin className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm text-slate-300">LinkedIn Profiel</span>
                  </a>
                )}
                {user.phoneNumber && (
                  <a href={`tel:${user.phoneNumber}`} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <Phone className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                    <span className="text-sm text-slate-300">Telefoonnummer</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeIn delay={0.35}>
          <p className="text-xs text-slate-600 text-center pt-4">{user.companyName || user.naam}</p>
        </FadeIn>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <section className="min-h-screen flex items-center justify-center px-8 py-8">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-2 gap-16 items-center">
            <FadeInUp delay={0.1}>
              <div>
                {user.logo && <Image src={user.logo} alt="Logo" width={100} height={50} className="object-contain mb-6 opacity-80" />}
                <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                  {user.naam.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                </h1>
                {user.companyName && <p className="text-xl font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>{user.companyName}</p>}
                {user.bio && (
                  <div className="mb-6 max-w-md">
                    <p className="text-slate-300 leading-relaxed mb-4">{user.bio}</p>
                    {(workExpCount > 0 || certCount > 0) && (
                      <div className="flex gap-6 pt-4 border-t border-slate-700">
                        {workExpCount > 0 && (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}>
                              <Briefcase className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                            </div>
                            <div>
                              <p className="text-xl font-bold text-white">{workExpCount}+</p>
                              <p className="text-sm text-slate-400">Werkervaring</p>
                            </div>
                          </div>
                        )}
                        {certCount > 0 && (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}>
                              <Award className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                            </div>
                            <div>
                              <p className="text-xl font-bold text-white">{certCount}+</p>
                              <p className="text-sm text-slate-400">Certificeringen</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {(user.kvkNumber || location) && (
                  <div className="flex gap-6 mb-6 text-sm text-slate-400">
                    {user.kvkNumber && <span>KvK: {user.kvkNumber}</span>}
                    {location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />{location}</span>}
                  </div>
                )}
                <div className="flex gap-4 flex-wrap">
                  {user.companyEmail && (
                    <a href={`mailto:${user.companyEmail}`} className="text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--color-accent)' }}>
                      <Mail className="w-4 h-4" /> Contact
                    </a>
                  )}
                  {user.linkedinUrl && (
                    <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="border border-slate-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-slate-800">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  )}
                  {user.phoneNumber && (
                    <a href={`tel:${user.phoneNumber}`} className="border border-slate-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-slate-800">
                      <Phone className="w-4 h-4" /> Telefoonnummer
                    </a>
                  )}
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="relative flex justify-center">
                {/* White backlight - 75% of 2x size */}
                <div className="absolute -inset-12 rounded-full blur-3xl bg-white opacity-20" />
                {/* Accent backlight - 75% of 2x size */}
                <div className="absolute -inset-12 rounded-full blur-3xl" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)' }} />
                {user.profilePicture ? (
                  <Image src={user.profilePicture} alt={user.naam} width={400} height={400} className="relative rounded-3xl object-cover w-full aspect-square shadow-2xl ring-1 ring-white/10" />
                ) : (
                  <div className="relative w-full aspect-square bg-slate-800 rounded-3xl flex items-center justify-center ring-1 ring-white/10 text-8xl" style={{ color: 'var(--color-accent)' }}>
                    {user.naam.charAt(0)}
                  </div>
                )}
              </div>
            </FadeInUp>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-8 pt-4 pb-12">
          <div className="grid grid-cols-2 gap-10">
            {user.workExperiences?.length > 0 && (
              <FadeInUp delay={0.3}>
                <div>
                  <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}><Briefcase className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /></div>
                    Werkervaring
                  </h2>
                  <div className="space-y-4">
                    {user.workExperiences.map((exp) => {
                      const isExpanded = expandedItems[`work-${exp.id}`] || false;
                      return (
                        <Card key={exp.id} className="transition-colors" style={{ ['--tw-border-opacity' as string]: 1 }}>
                          <div className="flex justify-between gap-4 items-start">
                            <div className="flex-1">
                              <div className="flex justify-between gap-4 items-center mb-1">
                                <div>
                                  <h3 className="font-bold text-white">{exp.company}</h3>
                                  {exp.role && <p className="text-sm" style={{ color: 'var(--color-accent)' }}>{exp.role}</p>}
                                </div>
                                <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded h-fit">{formatDate(exp.startDate)} - {exp.current ? "Heden" : formatDate(exp.endDate)}</span>
                              </div>
                            </div>
                            {exp.description && (
                              <button
                                onClick={() => toggleItem(`work-${exp.id}`)}
                                className="flex items-center justify-center w-6 h-6 text-slate-400 hover:text-white transition-colors ml-2 flex-shrink-0"
                                aria-label={isExpanded ? "Beschrijving verbergen" : "Beschrijving tonen"}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </button>
                            )}
                          </div>
                          {exp.description && isExpanded && (
                            <div className="mt-3 animate-in fade-in duration-200">
                              <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </FadeInUp>
            )}

            {user.educations?.length > 0 && (
              <FadeInUp delay={0.35}>
                <div>
                  <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}><GraduationCap className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /></div>
                    Opleiding
                  </h2>
                  <div className="space-y-4">
                    {user.educations.map((edu) => (
                      <Card key={edu.id} className="transition-colors">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-white">{edu.institution}</h3>
                            <p className="text-sm" style={{ color: 'var(--color-accent)' }}>{edu.degree}{edu.field && ` - ${edu.field}`}</p>
                          </div>
                          {(edu.startDate || edu.endDate) && <span className="text-xs text-slate-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            )}
          </div>

          {user.certifications?.length > 0 && (
            <FadeInUp delay={0.4}>
              <div className="mt-10">
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}><Award className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /></div>
                  Certificeringen
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {user.certifications.map((cert) => (
                    <Card key={cert.id} className="transition-colors">
                      <h3 className="font-bold text-white">{cert.name}</h3>
                      {cert.issuer && <p className="text-sm text-slate-500">{cert.issuer}</p>}
                      {(cert.startDate || cert.endDate) && (
                        <p className="text-xs text-slate-500 mt-2">
                          {formatDate(cert.startDate)}{cert.endDate && ` - ${formatDate(cert.endDate)}`}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </FadeInUp>
          )}

          <FadeIn delay={0.45}>
            <div className="mt-12 rounded-2xl p-8 text-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)' }}>
              <h2 className="text-2xl font-bold text-white mb-2">Neem Contact Op</h2>
              <p className="text-slate-400 mb-6">Laten we samenwerken</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {user.companyEmail && (
                  <a href={`mailto:${user.companyEmail}`} className="text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all hover:opacity-90 hover:scale-105 shadow-lg" style={{ backgroundColor: 'var(--color-accent)' }}>
                    <Mail className="w-5 h-5" /> Email
                  </a>
                )}
                {user.linkedinUrl && (
                  <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-slate-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-slate-800 transition-all hover:scale-105 shadow-lg">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </a>
                )}
                {user.phoneNumber && (
                  <a href={`tel:${user.phoneNumber}`} className="border-2 border-slate-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-slate-800 transition-all hover:scale-105 shadow-lg">
                    <Phone className="w-5 h-5" /> Telefoonnummer
                  </a>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-sm text-slate-600 text-center mt-10">{user.companyName || user.naam}</p>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
