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
    <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ borderBottom: "1px solid #ccc", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>{title}</h3>
        {children}
    </div>
);

export const StandardLayout: React.FC<LayoutProps> = ({ data, labels }) => {
    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <header style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1>{data.user.fullName}</h1>
                <p>{data.user.contactEmail} | {data.user.phone}</p>
                <p>
                    {data.user.linkedin && <a href={data.user.linkedin}>LinkedIn</a>}
                    {data.user.linkedin && data.user.github && " | "}
                    {data.user.github && <a href={data.user.github}>GitHub</a>}
                </p>
            </header>

            {data.summary && (
                <Section title={labels.summary}>
                    <p>{data.summary.content}</p>
                </Section>
            )}

            <Section title={labels.experience}>
                {data.experience.map((exp) => (
                    <div key={exp.id} style={{ marginBottom: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <strong>{exp.company}</strong>
                            <span>
                                {exp.startDate?.getFullYear()} - {exp.isCurrent ? "Present" : exp.endDate?.getFullYear()}
                            </span>
                        </div>
                        {exp.jobTitle && <div style={{ fontStyle: "italic" }}>{exp.jobTitle}</div>}
                        {exp.description && <p style={{ margin: "0.5rem 0" }}>{exp.description}</p>}
                        <p><strong>Stack:</strong> {exp.technologies.join(", ")}</p>
                    </div>
                ))}
            </Section>

            <Section title={labels.education}>
                {data.education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: "1rem" }}>
                        <strong>{edu.institution}</strong> ({edu.startYear} - {edu.endYear})
                        {edu.title && <div>{edu.title}</div>}
                        {edu.description && <p>{edu.description}</p>}
                    </div>
                ))}
            </Section>

            <Section title={labels.skills}>
                <p><strong>{labels.tech}:</strong> {data.techSkills.map(s => s.name).join(", ")}</p>
                <p><strong>{labels.soft}:</strong> {data.softSkills.map(s => s.key).join(", ")}</p>
                <p><strong>{labels.languages}:</strong> {data.languages.map(l => l.name).join(", ")}</p>
            </Section>
        </div>
    );
};

export const TwoColumnLayout: React.FC<LayoutProps> = ({ data, labels }) => {
    return (
        <div style={{ display: "flex", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif", minHeight: "100vh" }}>
            {/* Sidebar */}
            <div style={{ width: "30%", backgroundColor: "#f4f4f4", padding: "2rem" }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    {data.user.profileImageUrl && (
                        <img
                            src={data.user.profileImageUrl}
                            alt={data.user.fullName}
                            style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" }}
                        />
                    )}
                    <h2>{data.user.fullName}</h2>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <h4>{labels.contact}</h4>
                    <p style={{ fontSize: "0.9rem" }}>{data.user.contactEmail}</p>
                    <p style={{ fontSize: "0.9rem" }}>{data.user.phone}</p>
                    {data.user.linkedin && <p style={{ fontSize: "0.9rem" }}><a href={data.user.linkedin}>LinkedIn</a></p>}
                    {data.user.github && <p style={{ fontSize: "0.9rem" }}><a href={data.user.github}>GitHub</a></p>}
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <h4>{labels.skills}</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {data.techSkills.map(s => (
                            <span key={s.id} style={{ backgroundColor: "#ddd", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem" }}>
                                {s.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4>{labels.languages}</h4>
                    <ul style={{ paddingLeft: "1rem" }}>
                        {data.languages.map(l => <li key={l.id}>{l.name}</li>)}
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ width: "70%", padding: "2rem" }}>
                {data.summary && (
                    <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ color: "#333", borderBottom: "2px solid #333", paddingBottom: "0.5rem" }}>{labels.profile}</h3>
                        <p>{data.summary.content}</p>
                    </div>
                )}

                <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ color: "#333", borderBottom: "2px solid #333", paddingBottom: "0.5rem" }}>{labels.experience}</h3>
                    {data.experience.map((exp) => (
                        <div key={exp.id} style={{ marginBottom: "1.5rem" }}>
                            <h4 style={{ margin: "0 0 0.2rem 0" }}>{exp.company}</h4>
                            <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                                {exp.startDate?.toLocaleDateString()} - {exp.isCurrent ? "Present" : exp.endDate?.toLocaleDateString()}
                            </div>
                            {exp.jobTitle && <div style={{ fontWeight: "bold", marginBottom: "0.2rem" }}>{exp.jobTitle}</div>}
                            {exp.description && <p style={{ margin: "0 0 0.5rem 0" }}>{exp.description}</p>}
                            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#555" }}>{exp.technologies.join(" • ")}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h3 style={{ color: "#333", borderBottom: "2px solid #333", paddingBottom: "0.5rem" }}>{labels.education}</h3>
                    {data.education.map((edu) => (
                        <div key={edu.id} style={{ marginBottom: "1rem" }}>
                            <strong>{edu.institution}</strong>
                            <div>{edu.startYear} - {edu.endYear}</div>
                            {edu.title && <div>{edu.title}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const IALayout: React.FC<LayoutProps> = ({ data, labels }) => {
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Georgia, serif", padding: "3rem" }}>
            <header style={{ borderBottom: "1px solid black", paddingBottom: "1rem", marginBottom: "2rem" }}>
                <h1 style={{ margin: "0", fontSize: "2.5rem" }}>{data.user.fullName}</h1>
                <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                    {data.user.contactEmail} • {data.user.phone}
                </div>
            </header>

            {data.summary && (
                <section style={{ marginBottom: "2rem" }}>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{data.summary.content}</p>
                </section>
            )}

            <section style={{ marginBottom: "2rem" }}>
                <h3 style={{ textTransform: "uppercase", letterSpacing: "1px", fontSize: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>{labels.experience}</h3>
                {data.experience.map((exp) => (
                    <div key={exp.id} style={{ marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <h4 style={{ margin: "0", fontSize: "1.1rem" }}>{exp.company}</h4>
                            <span style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
                                {exp.startDate?.getFullYear()} – {exp.isCurrent ? "Present" : exp.endDate?.getFullYear()}
                            </span>
                        </div>
                        {exp.jobTitle && <div style={{ fontWeight: "bold" }}>{exp.jobTitle}</div>}
                        {exp.description && <p style={{ marginTop: "0.5rem" }}>{exp.description}</p>}
                        <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
                            {exp.technologies.join(", ")}
                        </div>
                    </div>
                ))}
            </section>

            <section>
                <h3 style={{ textTransform: "uppercase", letterSpacing: "1px", fontSize: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>{labels.education}</h3>
                {data.education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: "1rem" }}>
                        <strong>{edu.institution}</strong>, {edu.startYear}–{edu.endYear}
                        {edu.title && <div>{edu.title}</div>}
                    </div>
                ))}
            </section>
        </div>
    );
};
