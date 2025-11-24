import React from "react";
import { User } from "@/domain/User";
import { Experience } from "@/domain/Experience";
import { Education } from "@/domain/Education";
import { Summary } from "@/domain/Summary";
import { Language } from "@/domain/Language";
import { SoftSkill } from "@/domain/SoftSkill";
import { TechSkill } from "@/domain/TechSkill";

export interface CvData {
    user: User;
    summary: Summary | null;
    experience: Experience[];
    education: Education[];
    languages: Language[];
    softSkills: SoftSkill[];
    techSkills: TechSkill[];
}

export interface LayoutLabels {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    tech: string;
    soft: string;
    languages: string;
    contact: string;
    profile: string;
}

interface LayoutProps {
    data: CvData;
    labels: LayoutLabels;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="border-b border-gray-300 pb-2 mb-2">{title}</h3>
        {children}
    </div>
);

export const StandardLayout: React.FC<LayoutProps> = ({ data, labels }) => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-8 py-12">
                {/* Header */}
                <header className="mb-12 pb-8 border-b-2 border-gray-200">
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">{data.user.fullName}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {data.user.contactEmail}
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {data.user.phone}
                        </span>
                        {data.user.linkedin && (
                            <a href={data.user.linkedin} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                LinkedIn
                            </a>
                        )}
                        {data.user.github && (
                            <a href={data.user.github} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                        )}
                    </div>
                </header>

                {/* Summary */}
                {data.summary && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">{labels.summary}</h2>
                        <p className="text-gray-700 leading-relaxed text-base">{data.summary.content}</p>
                    </section>
                )}

                {/* Experience */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">{labels.experience}</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp) => (
                            <div key={exp.id} className="border-l-4 border-blue-500 pl-6 py-2">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
                                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                                        {exp.startDate?.getFullYear()} - {exp.isCurrent ? "Present" : exp.endDate?.getFullYear()}
                                    </span>
                                </div>
                                {exp.jobTitle && <p className="text-lg text-blue-600 font-medium mb-2">{exp.jobTitle}</p>}
                                {exp.description && <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>}
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">{labels.education}</h2>
                    <div className="space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id} className="border-l-4 border-green-500 pl-6 py-2">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{edu.institution}</h3>
                                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                                        {edu.startYear} - {edu.endYear}
                                    </span>
                                </div>
                                {edu.title && <p className="text-gray-700 font-medium">{edu.title}</p>}
                                {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">{labels.skills}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{labels.tech}</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.techSkills.map(s => (
                                    <span key={s.id} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{labels.soft}</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.softSkills.map(s => (
                                    <span key={s.id} className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded">
                                        {s.key}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{labels.languages}</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.languages.map(l => (
                                    <span key={l.id} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded">
                                        {l.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export const TwoColumnLayout: React.FC<LayoutProps> = ({ data, labels }) => {
    return (
        <div className="container mx-auto max-w-[1000px] bg-white">
            <div className="flex max-w-7xl mx-auto">
                {/* Sidebar */}
                <aside className="w-72 bg-gray-700 text-white p-10 min-h-screen">
                    <div className="mb-8">
                        {data.user.profileImageUrl && (
                            <img
                                src={data.user.profileImageUrl}
                                alt={data.user.fullName}
                                className="w-28 h-28 rounded-full object-cover mb-5 mx-auto border-3 border-white shadow-md"
                            />
                        )}
                        <h1 className="text-xl font-bold text-center mb-1 leading-tight">{data.user.fullName}</h1>
                    </div>

                    {/* Contact */}
                    <div className="mb-7">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3 pb-1.5 border-b border-gray-600">
                            {labels.contact}
                        </h3>
                        <div className="space-y-2.5 text-xs leading-relaxed">
                            <div className="flex items-start gap-2">
                                <svg className=" flex-grow-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="">{data.user.contactEmail}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-3 h-3 flex-grow-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{data.user.phone}</span>
                            </div>
                            {data.user.linkedin && (
                                <a href={data.user.linkedin} className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                                    <svg className="w-3 h-3 flex-grow-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    <span>LinkedIn</span>
                                </a>
                            )}
                            {data.user.github && (
                                <a href={data.user.github} className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                                    <svg className="w-3 h-3 flex-grow-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Tech Skills */}
                    <div className="mb-7">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3 pb-1.5 border-b border-gray-600">
                            {labels.tech}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {data.techSkills.map(s => (
                                <span key={s.id} className="px-2 py-0.5 bg-gray-600 text-white text-xs font-normal rounded">
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="mb-7">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3 pb-1.5 border-b border-gray-600">
                            {labels.soft}
                        </h3>
                        <ul className="space-y-1.5 text-xs">
                            {data.softSkills.map(s => (
                                <li key={s.id} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    {s.key}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Languages */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3 pb-1.5 border-b border-gray-600">
                            {labels.languages}
                        </h3>
                        <ul className="space-y-1.5 text-xs">
                            {data.languages.map(l => (
                                <li key={l.id} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    {l.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10 bg-white">
                    {/* Profile Summary */}
                    {data.summary && (
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-1.5 border-b-2 border-gray-900">
                                {labels.profile}
                            </h2>
                            <p className="text-gray-800 leading-relaxed mt-3 text-sm">{data.summary.content}</p>
                        </section>
                    )}

                    {/* Experience */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-1.5 border-b-2 border-gray-900">
                            {labels.experience}
                        </h2>
                        <div className="mt-4 space-y-5">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-gray-900 before:rounded-full">
                                    <div className="mb-1.5">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-lg font-bold text-gray-900">{exp.company}</h3>
                                            <span className="text-xs text-gray-600 whitespace-nowrap ml-3">
                                                {exp.startDate?.getFullYear()} - {exp.isCurrent ? "Present" : exp.endDate?.getFullYear()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 font-semibold">{exp.jobTitle}</p>
                                    </div>
                                    {exp.description && (
                                        <p className="text-gray-700 mb-2 leading-relaxed text-sm">{exp.description}</p>
                                    )}
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.technologies.map((tech, idx) => (
                                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-normal rounded border border-gray-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-1.5 border-b-2 border-gray-900">
                            {labels.education}
                        </h2>
                        <div className="mt-4 space-y-4">
                            {data.education.map((edu) => (
                                <div key={edu.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-gray-900 before:rounded-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900">{edu.institution}</h3>
                                            {edu.title && <p className="text-gray-700 font-medium text-sm mt-0.5">{edu.title}</p>}
                                            {edu.description && <p className="text-gray-600 text-xs mt-0.5">{edu.description}</p>}
                                        </div>
                                        <span className="text-xs text-gray-600 whitespace-nowrap ml-3">
                                            {edu.startYear} - {edu.endYear}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export const IALayout: React.FC<LayoutProps> = ({ data, labels }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-12 py-16 bg-white shadow-sm">
                {/* Header */}
                <header className="mb-12 pb-6 border-b-2 border-gray-900">
                    <h1 className="text-5xl font-serif font-bold text-gray-900 mb-3">{data.user.fullName}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {data.user.contactEmail}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {data.user.phone}
                        </span>
                        {data.user.linkedin && (
                            <>
                                <span className="text-gray-400">•</span>
                                <a href={data.user.linkedin} className="text-blue-700 hover:text-blue-900 underline">
                                    LinkedIn
                                </a>
                            </>
                        )}
                        {data.user.github && (
                            <>
                                <span className="text-gray-400">•</span>
                                <a href={data.user.github} className="text-blue-700 hover:text-blue-900 underline">
                                    GitHub
                                </a>
                            </>
                        )}
                    </div>
                </header>

                {/* Summary */}
                {data.summary && (
                    <section className="mb-10">
                        <p className="text-lg text-gray-800 leading-relaxed font-serif italic border-l-4 border-gray-300 pl-6 py-2">
                            {data.summary.content}
                        </p>
                    </section>
                )}

                {/* Experience */}
                <section className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-300 pb-2">
                        {labels.experience}
                    </h2>
                    <div className="space-y-6">
                        {data.experience.map((exp) => (
                            <div key={exp.id} className="group">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-serif font-semibold text-gray-900">{exp.company}</h3>
                                    <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">
                                        {exp.startDate?.getFullYear()} – {exp.isCurrent ? "Present" : exp.endDate?.getFullYear()}
                                    </span>
                                </div>
                                {exp.jobTitle && (
                                    <p className="text-base font-medium text-gray-700 mb-2">{exp.jobTitle}</p>
                                )}
                                {exp.description && (
                                    <p className="text-gray-700 leading-relaxed mb-3">{exp.description}</p>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, idx) => (
                                        <span key={idx} className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-0.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-300 pb-2">
                        {labels.education}
                    </h2>
                    <div className="space-y-5">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-serif font-semibold text-gray-900">{edu.institution}</h3>
                                    <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">
                                        {edu.startYear}–{edu.endYear}
                                    </span>
                                </div>
                                {edu.title && <p className="text-gray-700 font-medium">{edu.title}</p>}
                                {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-300 pb-2">
                        {labels.skills}
                    </h2>
                    <div className="space-y-4">
                        {/* Tech Skills */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                                {labels.tech}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.techSkills.map(s => (
                                    <span key={s.id} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-mono rounded-sm border border-gray-200">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Soft Skills */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                                {labels.soft}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {data.softSkills.map(s => s.key).join(" • ")}
                            </p>
                        </div>

                        {/* Languages */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                                {labels.languages}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {data.languages.map(l => l.name).join(" • ")}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
