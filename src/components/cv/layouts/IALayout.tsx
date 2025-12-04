import React from "react";
import { LayoutProps } from "./types";

export const IALayout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ data, labels }, ref) => {
    return (
      <div
        ref={ref}
        className="mx-auto px-12 py-16 bg-white shadow-sm ia-layout"
        style={{ width: "210mm", minHeight: "297mm" }}
      >
        <style>{`
          .ia-layout {
            font-size: calc(16px * var(--scale-factor, 1));
          }
          .ia-layout h1 {
            font-size: calc(3rem * var(--scale-factor, 1));
          }
          .ia-layout h2 {
            font-size: calc(1.5rem * var(--scale-factor, 1));
          }
          .ia-layout h3 {
            font-size: calc(1.125rem * var(--scale-factor, 1));
          }
          .ia-layout .text-xs {
            font-size: calc(0.75rem * var(--scale-factor, 1));
          }
          .ia-layout .text-sm {
            font-size: calc(0.875rem * var(--scale-factor, 1));
          }
          .ia-layout .text-base {
            font-size: calc(1rem * var(--scale-factor, 1));
          }
          .ia-layout .text-lg {
            font-size: calc(1.125rem * var(--scale-factor, 1));
          }
          .ia-layout .text-xl {
            font-size: calc(1.25rem * var(--scale-factor, 1));
          }
          .ia-layout .text-2xl {
            font-size: calc(1.5rem * var(--scale-factor, 1));
          }
          .ia-layout .px-2 {
            padding-left: calc(0.5rem * var(--scale-factor, 1));
            padding-right: calc(0.5rem * var(--scale-factor, 1));
          }
          .ia-layout .px-3 {
            padding-left: calc(0.75rem * var(--scale-factor, 1));
            padding-right: calc(0.75rem * var(--scale-factor, 1));
          }
          .ia-layout .px-6 {
            padding-left: calc(1.5rem * var(--scale-factor, 1));
            padding-right: calc(1.5rem * var(--scale-factor, 1));
          }
          .ia-layout .px-12 {
            padding-left: calc(3rem * var(--scale-factor, 1));
            padding-right: calc(3rem * var(--scale-factor, 1));
          }
          .ia-layout .py-0\\.5 {
            padding-top: calc(0.125rem * var(--scale-factor, 1));
            padding-bottom: calc(0.125rem * var(--scale-factor, 1));
          }
          .ia-layout .py-2 {
            padding-top: calc(0.5rem * var(--scale-factor, 1));
            padding-bottom: calc(0.5rem * var(--scale-factor, 1));
          }
          .ia-layout .py-16 {
            padding-top: calc(4rem * var(--scale-factor, 1));
            padding-bottom: calc(4rem * var(--scale-factor, 1));
          }
          .ia-layout .pb-2 {
            padding-bottom: calc(0.5rem * var(--scale-factor, 1));
          }
          .ia-layout .pb-6 {
            padding-bottom: calc(1.5rem * var(--scale-factor, 1));
          }
          .ia-layout .pl-6 {
            padding-left: calc(1.5rem * var(--scale-factor, 1));
          }
          .ia-layout .mt-1 {
            margin-top: calc(0.25rem * var(--scale-factor, 1));
          }
          .ia-layout .ml-4 {
            margin-left: calc(1rem * var(--scale-factor, 1));
          }
          .ia-layout .mb-1 {
            margin-bottom: calc(0.25rem * var(--scale-factor, 1));
          }
          .ia-layout .mb-2 {
            margin-bottom: calc(0.5rem * var(--scale-factor, 1));
          }
          .ia-layout .mb-3 {
            margin-bottom: calc(0.75rem * var(--scale-factor, 1));
          }
          .ia-layout .mb-6 {
            margin-bottom: calc(1.5rem * var(--scale-factor, 1));
          }
          .ia-layout .mb-10 {
            margin-bottom: calc(2.5rem * var(--scale-factor, 1));
          }
          .ia-layout .mb-12 {
            margin-bottom: calc(3rem * var(--scale-factor, 1));
          }
          .ia-layout .gap-1\\.5 {
            gap: calc(0.375rem * var(--scale-factor, 1));
          }
          .ia-layout .gap-2 {
            gap: calc(0.5rem * var(--scale-factor, 1));
          }
          .ia-layout .gap-4 {
            gap: calc(1rem * var(--scale-factor, 1));
          }
          .ia-layout .space-y-4 > * + * {
            margin-top: calc(1rem * var(--scale-factor, 1));
          }
          .ia-layout .space-y-5 > * + * {
            margin-top: calc(1.25rem * var(--scale-factor, 1));
          }
          .ia-layout .space-y-6 > * + * {
            margin-top: calc(1.5rem * var(--scale-factor, 1));
          }
          .ia-layout .w-4 {
            width: calc(1rem * var(--scale-factor, 1));
            height: calc(1rem * var(--scale-factor, 1));
          }
          .ia-layout .w-1\\.5 {
            width: calc(0.375rem * var(--scale-factor, 1));
            height: calc(0.375rem * var(--scale-factor, 1));
          }
          .ia-layout .h-1\\.5 {
            height: calc(0.375rem * var(--scale-factor, 1));
          }
          .ia-layout .tracking-\\[0\\.2em\\] {
            letter-spacing: calc(0.2em * var(--scale-factor, 1));
          }
          .ia-layout .tracking-wider {
            letter-spacing: calc(0.05em * var(--scale-factor, 1));
          }
          .ia-layout .tracking-widest {
            letter-spacing: calc(0.1em * var(--scale-factor, 1));
          }
          .ia-layout .tracking-wide {
            letter-spacing: calc(0.025em * var(--scale-factor, 1));
          }
        `}</style>
        {/* Header */}
        <header className="mb-12 pb-6 border-b-2 border-gray-900">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-3">
            {data.user.fullName}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {data.user.contactEmail}
            </span>
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {data.user.phone}
            </span>
            {data.user.linkedin && (
              <>
                <span className="text-gray-400">|</span>
                <a
                  href={data.user.linkedin}
                  className="text-blue-700 hover:text-blue-900 underline"
                >
                  LinkedIn
                </a>
              </>
            )}
            {data.user.github && (
              <>
                <span className="text-gray-400">|</span>
                <a
                  href={data.user.github}
                  className="text-blue-700 hover:text-blue-900 underline"
                >
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
                  <h3 className="text-xl font-serif font-semibold text-gray-900">
                    {exp.company}
                  </h3>
                  <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">
                    {exp.startDate?.getFullYear()} -{" "}
                    {exp.isCurrent ? "Present" : exp.endDate?.getFullYear()}
                  </span>
                </div>
                {exp.jobTitle && (
                  <p className="text-base font-medium text-gray-700 mb-2">
                    {exp.jobTitle}
                  </p>
                )}
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {exp.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-0.5 rounded"
                    >
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
                  <h3 className="text-lg font-serif font-semibold text-gray-900">
                    {edu.institution}
                  </h3>
                  <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                {edu.title && (
                  <p className="text-gray-700 font-medium">{edu.title}</p>
                )}
                {edu.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {edu.description}
                  </p>
                )}
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
                {data.techSkills.map((s) => (
                  <span
                    key={s.id}
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-mono rounded-sm border border-gray-200"
                  >
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
                {data.softSkills.map((s) => s.key).join(" | ")}
              </p>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                {labels.languages}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {data.languages.map((l) => l.name).join(" | ")}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
);

IALayout.displayName = "IALayout";
