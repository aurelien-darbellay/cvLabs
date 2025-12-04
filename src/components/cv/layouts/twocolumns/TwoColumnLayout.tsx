import React from "react";
import { LayoutProps } from "../types";
import { LinkWithIcon } from "./LinkWithIcon";

export const TwoColumnLayout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ data, labels }, ref) => {
    return (
      <div
        ref={ref}
        className="mx-auto bg-white shadow-lg two-column-layout"
        style={{ width: "210mm" }}
      >
        <style>{`
          .two-column-layout {
            font-size: calc(16px * var(--scale-factor, 1));
          }
          .two-column-layout h1 {
            font-size: calc(3rem * var(--scale-factor, 1));
          }
          .two-column-layout h2 {
            font-size: calc(1.25rem * var(--scale-factor, 1));
          }
          .two-column-layout h3 {
            font-size: calc(1.125rem * var(--scale-factor, 1));
          }
          .two-column-layout .text-xs {
            font-size: calc(0.75rem * var(--scale-factor, 1));
          }
          .two-column-layout .text-sm {
            font-size: calc(0.875rem * var(--scale-factor, 1));
          }
          .two-column-layout .text-lg {
            font-size: calc(1.125rem * var(--scale-factor, 1));
          }
          .two-column-layout .text-xl {
            font-size: calc(1.25rem * var(--scale-factor, 1));
          }
          .two-column-layout .text-5xl {
            font-size: calc(3rem * var(--scale-factor, 1));
          }
          .two-column-layout .px-2 {
            padding-left: calc(0.5rem * var(--scale-factor, 1));
            padding-right: calc(0.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .px-2\\.5 {
            padding-left: calc(0.625rem * var(--scale-factor, 1));
            padding-right: calc(0.625rem * var(--scale-factor, 1));
          }
          .two-column-layout .py-0\\.5 {
            padding-top: calc(0.125rem * var(--scale-factor, 1));
            padding-bottom: calc(0.125rem * var(--scale-factor, 1));
          }
          .two-column-layout .px-5 {
            padding-left: calc(1.25rem * var(--scale-factor, 1));
            padding-right: calc(1.25rem * var(--scale-factor, 1));
          }
          .two-column-layout .px-10 {
            padding-left: calc(2.5rem * var(--scale-factor, 1));
            padding-right: calc(2.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .py-14 {
            padding-top: calc(3.5rem * var(--scale-factor, 1));
            padding-bottom: calc(3.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .pt-12 {
            padding-top: calc(3rem * var(--scale-factor, 1));
          }
          .two-column-layout .pb-8 {
            padding-bottom: calc(2rem * var(--scale-factor, 1));
          }
          .two-column-layout .p-5 {
            padding: calc(1.25rem * var(--scale-factor, 1));
          }
          .two-column-layout .mb-3 {
            margin-bottom: calc(0.75rem * var(--scale-factor, 1));
          }
          .two-column-layout .mb-4 {
            margin-bottom: calc(1rem * var(--scale-factor, 1));
          }
          .two-column-layout .mb-6 {
            margin-bottom: calc(1.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .mt-1 {
            margin-top: calc(0.25rem * var(--scale-factor, 1));
          }
          .two-column-layout .mt-2 {
            margin-top: calc(0.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .gap-1\\.5 {
            gap: calc(0.375rem * var(--scale-factor, 1));
          }
          .two-column-layout .gap-2 {
            gap: calc(0.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .gap-6 {
            gap: calc(1.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .space-y-1\\.5 > * + * {
            margin-top: calc(0.375rem * var(--scale-factor, 1));
          }
          .two-column-layout .w-1\\.5 {
            width: calc(0.375rem * var(--scale-factor, 1));
            height: calc(0.375rem * var(--scale-factor, 1));
          }
          .two-column-layout .h-1\\.5 {
            height: calc(0.375rem * var(--scale-factor, 1));
          }
          .two-column-layout .tracking-\\[0\\.2em\\] {
            letter-spacing: calc(0.2em * var(--scale-factor, 1));
          }
          .two-column-layout .space-y-3 > * + * {
            margin-top: calc(0.75rem * var(--scale-factor, 1));
          }
          .two-column-layout .space-y-5 > * + * {
            margin-top: calc(1.25rem * var(--scale-factor, 1));
          }
          .two-column-layout .pl-4 {
            padding-left: calc(1rem * var(--scale-factor, 1));
          }
          .two-column-layout .pl-70 {
            padding-left: calc(17.5rem * var(--scale-factor, 1));
          }
          .two-column-layout img.w-50 {
            width: calc(12.5rem * var(--scale-factor, 1));
            height: calc(12.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .w-10 {
            width: calc(2.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .h-10 {
            height: calc(2.5rem * var(--scale-factor, 1));
          }
          .two-column-layout .w-\\[30px\\] {
            width: calc(30px * var(--scale-factor, 1));
          }
          .two-column-layout .h-\\[30px\\] {
            height: calc(30px * var(--scale-factor, 1));
          }
        `}</style>
        {/* Top bar with name */}
        <header className="relative bg-slate-800 text-white px-10 py-14 flex items-center">
          {data.user.profileImageUrl && (
            <img
              src={data.user.profileImageUrl}
              alt={data.user.fullName}
              className="absolute top-6 w-50 h-50 rounded-full object-cover shadow-lg z-10"
            />
          )}
          <div className="pl-70">
            <h1 className="text-5xl font-bold tracking-tight uppercase">
              {data.user.fullName}
            </h1>
            {data.user.title && (
              <p className="text-sm uppercase tracking-widest text-slate-200">
                {data.user.title}
              </p>
            )}
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <div className="relative w-[275px] bg-slate-700 text-white px-5 pt-12 pb-8 flex flex-col gap-6">
            {/* Contact */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-3 pb-2 border-b border-slate-500">
                {labels.contact}
              </h3>
              <div className="flex flex-col gap-2 text-sm leading-relaxed">
                <LinkWithIcon
                  icon={
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.3}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  textClassName="break-all"
                  href={`mailto:${data.user.contactEmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.user.contactEmail}
                </LinkWithIcon>
                <LinkWithIcon
                  icon={
                    <svg
                      className="w-[30px] h-[30px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.3}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  }
                >
                  {data.user.phone}
                </LinkWithIcon>
                {data.user.linkedin && (
                  <LinkWithIcon
                    icon={
                      <svg
                        className="w-[30px] h-[30px]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    }
                    href={data.user.linkedin}
                  >
                    LinkedIn
                  </LinkWithIcon>
                )}
                {data.user.github && (
                  <LinkWithIcon
                    icon={
                      <svg
                        className="w-[30px] h-[30px]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    }
                    href={data.user.github}
                  >
                    GitHub
                  </LinkWithIcon>
                )}
              </div>
            </div>

            {/* Tech Skills */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-3 pb-2 border-b border-slate-500">
                {labels.tech}
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.techSkills.map((s) => (
                  <span
                    key={s.id}
                    data-badge="tech-skill"
                    className="px-2.5 py-0.5 bg-slate-600 text-white text-xs rounded"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-3 pb-2 border-b border-slate-500">
                {labels.soft}
              </h3>
              <ul className="space-y-1.5 text-sm">
                {data.softSkills.map((s) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    {s.key}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-3 pb-2 border-b border-slate-500">
                {labels.languages}
              </h3>
              <ul className="space-y-1.5 text-sm">
                {data.languages.map((l) => (
                  <li key={l.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <span>{l.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-5">
            {/* Profile Summary */}
            {data.summary && (
              <section className="mb-6">
                <p className="text-gray-800 leading-relaxed text-sm text-justify">
                  {data.summary.content}
                </p>
              </section>
            )}

            {/* Experience */}
            <section className="mb-6">
              <h2 className="text-xl font-bold uppercase tracking-widest text-slate-800 mb-4">
                {labels.experience}
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="pl-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-extrabold text-slate-900 uppercase">
                        {exp.jobTitle || exp.company}
                      </h3>
                      <span className="text-xs text-slate-600 whitespace-nowrap ml-4">
                        {exp.startDate?.getFullYear()} -{" "}
                        {exp.isCurrent ? "Present" : exp.endDate?.getFullYear()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {exp.company}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed text-sm mt-1">
                        {exp.description}
                      </p>
                    )}
                    {exp.clients && exp.clients.length > 0 && (
                      <p className="text-sm text-slate-700">
                        <span className="italic">Clients:</span>{" "}
                        {Array.isArray(exp.clients)
                          ? exp.clients.join(", ")
                          : exp.clients}
                      </p>
                    )}
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            data-badge="experience-tech"
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest text-slate-800 mb-4">
                {labels.education}
              </h2>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id} className="pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 uppercase">
                          {edu.title || edu.institution}
                        </h3>
                        <p className="text-sm text-slate-800">
                          {edu.institution}
                        </p>
                        {edu.description && (
                          <p className="text-gray-700 text-sm mt-1">
                            {edu.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-slate-600 whitespace-nowrap ml-4">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
);

TwoColumnLayout.displayName = "TwoColumnLayout";
