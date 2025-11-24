import { useState } from "react";
import { useCvs } from "@/hooks/useCvs";
import { useEducationList } from "@/hooks/useEducation";
import { useExperienceList } from "@/hooks/useExperience";
import { useLanguages, useSoftSkills, useTechSkills } from "@/hooks/useSkills";
import { AuthButton } from "@/components/auth/AuthButton";
import { CvViewer } from "@/components/cv/CvViewer";
import { Cv } from "@/domain/Cv";

export default function App() {
  const { cvs, loading: loadingCvs, error: errorCvs } = useCvs();
  const { education } = useEducationList();
  const { experience } = useExperienceList();
  const { languages } = useLanguages();
  const { softSkills } = useSoftSkills();
  const { techSkills } = useTechSkills();
  const [selectedCv, setSelectedCv] = useState<Cv | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "1.5rem" }}>
      <AuthButton />
      {selectedCv && <CvViewer cv={selectedCv} onClose={() => setSelectedCv(null)} />}
      <h1>My CV App</h1>

      <section>
        <h2>CVs</h2>
        {loadingCvs && <p>Loading CVs...</p>}
        {errorCvs && <p style={{ color: "red" }}>{errorCvs.message}</p>}
        {cvs.length === 0 && !loadingCvs ? (
          <p>No CVs yet. Create one via the API or add a simple form here.</p>
        ) : (
          <ul>
            {cvs.map((cv) => (
              <li key={cv.id} style={{ marginBottom: "0.5rem" }}>
                <strong>{cv.title ?? "(untitled)"}</strong>
                <button
                  onClick={() => setSelectedCv(cv)}
                  style={{ marginLeft: "1rem", cursor: "pointer", padding: "0.2rem 0.5rem" }}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Education ({education.length})</h2>
        <ul>
          {education.map((e) => (
            <li key={e.id}>
              {e.institution}{" "}
              {e.startYear && (
                <>
                  ({e.startYear}
                  {e.endYear ? `–${e.endYear}` : ""})
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Experience ({experience.length})</h2>
        <ul>
          {experience.map((ex) => (
            <li key={ex.id}>
              {ex.company} —{" "}
              {ex.isCurrent
                ? "Current"
                : `${ex.startDate?.getFullYear() ?? "?"}–${ex.endDate?.getFullYear() ?? "?"
                }`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Languages ({languages.length})</h2>
        <ul>
          {languages.map((l) => (
            <li key={l.id}>{l.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Soft Skills ({softSkills.length})</h2>
        <ul>
          {softSkills.map((s) => (
            <li key={s.id}>{s.key}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Tech Skills ({techSkills.length})</h2>
        <ul>
          {techSkills.map((t) => (
            <li key={t.id}>{t.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
