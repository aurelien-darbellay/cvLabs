import React from "react";
import { LayoutProps } from "./types";

export const StandardLayout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ data, labels }, ref) => {
    return (
      <div ref={ref} className="min-h-screen bg-gray-100 py-6 standard-layout">
        <style>{`
          .standard-layout {
            font-size: calc(16px * var(--scale-factor, 1));
          }
          .standard-layout h1 {
            font-size: calc(3rem * var(--scale-factor, 1));
          }
          .standard-layout h2 {
            font-size: calc(1.5rem * var(--scale-factor, 1));
          }
          .standard-layout h3 {
            font-size: calc(1.25rem * var(--scale-factor, 1));
          }
          .standard-layout .text-xs {
            font-size: calc(0.75rem * var(--scale-factor, 1));
          }
          .standard-layout .text-sm {
            font-size: calc(0.875rem * var(--scale-factor, 1));
          }
          .standard-layout .text-base {
            font-size: calc(1rem * var(--scale-factor, 1));
          }
          .standard-layout .text-lg {
            font-size: calc(1.125rem * var(--scale-factor, 1));
          }
          .standard-layout .text-xl {
            font-size: calc(1.25rem * var(--scale-factor, 1));
          }
          .standard-layout .text-2xl {
            font-size: calc(1.5rem * var(--scale-factor, 1));
          }
          .standard-layout .text-5xl {
            font-size: calc(3rem * var(--scale-factor, 1));
          }
          .standard-layout .px-3 {
            padding-left: calc(0.75rem * var(--scale-factor, 1));
            padding-right: calc(0.75rem * var(--scale-factor, 1));
          }
          .standard-layout .px-8 {
            padding-left: calc(2rem * var(--scale-factor, 1));
            padding-right: calc(2rem * var(--scale-factor, 1));
          }
          .standard-layout .py-1 {
            padding-top: calc(0.25rem * var(--scale-factor, 1));
            padding-bottom: calc(0.25rem * var(--scale-factor, 1));
          }
          .standard-layout .py-2 {
            padding-top: calc(0.5rem * var(--scale-factor, 1));
            padding-bottom: calc(0.5rem * var(--scale-factor, 1));
          }
          .standard-layout .py-4 {
            padding-top: calc(1rem * var(--scale-factor, 1));
            padding-bottom: calc(1rem * var(--scale-factor, 1));
          }
          .standard-layout .py-6 {
            padding-top: calc(1.5rem * var(--scale-factor, 1));
            padding-bottom: calc(1.5rem * var(--scale-factor, 1));
          }
          .standard-layout .py-12 {
            padding-top: calc(3rem * var(--scale-factor, 1));
            padding-bottom: calc(3rem * var(--scale-factor, 1));
          }
          .standard-layout .pb-8 {
            padding-bottom: calc(2rem * var(--scale-factor, 1));
          }
          .standard-layout .mt-1 {
            margin-top: calc(0.25rem * var(--scale-factor, 1));
          }
          .standard-layout .ml-4 {
            margin-left: calc(1rem * var(--scale-factor, 1));
          }
          .standard-layout .mb-1 {
            margin-bottom: calc(0.25rem * var(--scale-factor, 1));
          }
          .standard-layout .mb-2 {
            margin-bottom: calc(0.5rem * var(--scale-factor, 1));
          }
          .standard-layout .mb-3 {
            margin-bottom: calc(0.75rem * var(--scale-factor, 1));
          }
          .standard-layout .mb-4 {
            margin-bottom: calc(1rem * var(--scale-factor, 1));
          }
          .standard-layout .mb-6 {
            margin-bottom: calc(1.5rem * var(--scale-factor, 1));
          }
          .standard-layout .mb-10 {
            margin-bottom: calc(2.5rem * var(--scale-factor, 1));
          }
          .standard-layout .mb-12 {
            margin-bottom: calc(3rem * var(--scale-factor, 1));
          }
          .standard-layout .gap-2 {
            gap: calc(0.5rem * var(--scale-factor, 1));
          }
          .standard-layout .gap-4 {
            gap: calc(1rem * var(--scale-factor, 1));
          }
          .standard-layout .gap-6 {
            gap: calc(1.5rem * var(--scale-factor, 1));
          }
          .standard-layout .space-y-4 > * + * {
            margin-top: calc(1rem * var(--scale-factor, 1));
          }
          .standard-layout .space-y-6 > * + * {
            margin-top: calc(1.5rem * var(--scale-factor, 1));
          }
          .standard-layout .w-4 {
            width: calc(1rem * var(--scale-factor, 1));
            height: calc(1rem * var(--scale-factor, 1));
          }
          .standard-layout .w-1\\.5 {
            width: calc(0.375rem * var(--scale-factor, 1));
            height: calc(0.375rem * var(--scale-factor, 1));
          }
          .standard-layout .h-1\\.5 {
            height: calc(0.375rem * var(--scale-factor, 1));
          }
          .standard-layout .tracking-\\[0\\.2em\\] {
            letter-spacing: calc(0.2em * var(--scale-factor, 1));
          }
          .standard-layout .tracking-wider {
            letter-spacing: calc(0.05em * var(--scale-factor, 1));
          }
          .standard-layout .tracking-widest {
            letter-spacing: calc(0.1em * var(--scale-factor, 1));
          }
          .standard-layout .tracking-wide {
            letter-spacing: calc(0.025em * var(--scale-factor, 1));
          }
        `}</style>
        <div
          className="bg-white mx-auto px-8 py-12 shadow-sm"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          {/* Header */}
          <header className="mb-12 pb-8 border-b-2 border-gray-200">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              {data.user.fullName}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-2">
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
              <span className="flex items-center gap-2">
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
                <a
                  href={data.user.linkedin}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
              )}
              {data.user.github && (
                <a
                  href={data.user.github}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                {labels.summary}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {data.summary.content}
              </p>
            </section>
          )}

          {/* Experience */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
              {labels.experience}
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border-l-4 border-blue-500 pl-6 py-2"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {exp.company}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {exp.startDate?.getFullYear()} -{" "}
                      {exp.isCurrent ? "Present" : exp.endDate?.getFullYear()}
                    </span>
                  </div>
                  {exp.jobTitle && (
                    <p className="text-lg text-blue-600 font-medium mb-2">
                      {exp.jobTitle}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
              {labels.education}
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="border-l-4 border-green-500 pl-6 py-2"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.institution}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
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

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
              {labels.skills}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {labels.tech}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.techSkills.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {labels.soft}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.softSkills.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded"
                    >
                      {s.key}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {labels.languages}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map((l) => (
                    <span
                      key={l.id}
                      className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded"
                    >
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
  }
);

StandardLayout.displayName = "StandardLayout";
