import { useCvs } from "@/hooks/useCvs";
import { useEducationList } from "@/hooks/useEducation";
import { useExperienceList } from "@/hooks/useExperience";
import { useLanguages, useSoftSkills, useTechSkills } from "@/hooks/useSkills";
import { AuthButton } from "@/components/auth/AuthButton";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  const deps = [user?.id];

  const { cvs, loading: loadingCvs, error: errorCvs } = useCvs(deps);
  const { education } = useEducationList(deps);
  const { experience } = useExperienceList(deps);
  const { languages } = useLanguages(deps);
  const { softSkills } = useSoftSkills(deps);
  const { techSkills } = useTechSkills(deps);

  return (
    <div className="font-sans p-6">
      <AuthButton />
      <h1 className="text-3xl font-bold mb-6">My CV App</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">CVs</h2>
        {loadingCvs && <p>Loading CVs...</p>}
        {errorCvs && <p className="text-red-600">{errorCvs.message}</p>}
        {cvs.length === 0 && !loadingCvs ? (
          <p>No CVs yet. Create one via the API or add a simple form here.</p>
        ) : (
          <ul className="space-y-2">
            {cvs.map((cv) => (
              <li key={cv.id} className="mb-2">
                <strong>{cv.title ?? "(untitled)"}</strong>
                <Link
                  to={`/cv/${cv.id}`}
                  className="ml-4 cursor-pointer px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-4xl font-semibold mb-4">
          Education ({education.length})
        </h2>
        <ul className="list-disc pl-5">
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

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Experience ({experience.length})
        </h2>
        <ul className="list-disc pl-5">
          {experience.map((ex) => (
            <li key={ex.id}>
              {ex.company} —{" "}
              {ex.isCurrent
                ? "Current"
                : `${ex.startDate?.getFullYear() ?? "?"}–${
                    ex.endDate?.getFullYear() ?? "?"
                  }`}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Languages ({languages.length})
        </h2>
        <ul className="list-disc pl-5">
          {languages.map((l) => (
            <li key={l.id}>{l.name}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Soft Skills ({softSkills.length})
        </h2>
        <ul className="list-disc pl-5">
          {softSkills.map((s) => (
            <li key={s.id}>{s.key}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Tech Skills ({techSkills.length})
        </h2>
        <ul className="list-disc pl-5">
          {techSkills.map((t) => (
            <li key={t.id}>{t.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
