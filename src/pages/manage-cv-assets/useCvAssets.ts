import { useState, useEffect } from "react";
import AssetItem from "./AssetItem";
import {
  cvEducationRelations,
  cvExperienceRelations,
  cvLanguageRelations,
  cvProfessionRelations,
  cvSoftSkillRelations,
  cvSummaryRelations,
  cvTechSkillRelations,
} from "@/services/cv/CvRelationsService";

export default function useCvAssets(
  cvId: string | undefined,
  userId: string | undefined,
  assetData: {
    education: any[];
    experience: any[];
    languageSkills: any[];
    softSkills: any[];
    techSkills: any[];
    summaries: any[];
    professions: any[];
  }
) {
  const {
    education,
    experience,
    languageSkills,
    softSkills,
    techSkills,
    summaries,
    professions,
  } = assetData;
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cvId || !userId) return;

    const fetchAssetsInCv = async () => {
      setLoading(true);
      try {
        const cvIdNum = Number(cvId);

        // Fetch all relation IDs for this CV
        const [
          eduInCv,
          expInCv,
          profInCv,
          techInCv,
          softInCv,
          sumInCv,
          langInCv,
        ] = await Promise.all([
          cvEducationRelations.getAssetsInCV(cvIdNum),
          cvExperienceRelations.getAssetsInCV(cvIdNum),
          cvProfessionRelations.getAssetsInCV(cvIdNum),
          cvTechSkillRelations.getAssetsInCV(cvIdNum),
          cvSoftSkillRelations.getAssetsInCV(cvIdNum),
          cvSummaryRelations.getAssetsInCV(cvIdNum),
          cvLanguageRelations.getAssetsInCV(cvIdNum),
        ]);

        // Map assets to AssetItem with isInCv flag
        const eduItems: AssetItem[] = education.map((edu: any) => ({
          id: edu.id,
          title: edu.institution,
          subtitle: edu.translatedFields[0]?.title || "",
          isInCv: eduInCv.some((rel) => rel.education_id === edu.id),
          type: "education",
        }));

        const expItems: AssetItem[] = experience.map((exp: any) => ({
          id: exp.id,
          title: exp.company,
          subtitle: exp.translatedFields[0]?.jobTitle || "",
          isInCv: expInCv.some((rel) => rel.experience_id === exp.id),
          type: "experience",
        }));

        const profItems: AssetItem[] = professions.map((prof: any) => ({
          id: prof.id,
          title: prof.translatedFields[0]?.title || "Untitled",
          subtitle: prof.translatedFields[0]?.description || "",
          isInCv: profInCv.some((rel) => rel.profession_id === prof.id),
          type: "profession",
        }));

        const techItems: AssetItem[] = techSkills.map((skill: any) => ({
          id: skill.id,
          title: skill.name,
          subtitle: undefined,
          isInCv: techInCv.some((rel) => rel.techskill_id === skill.id),
          type: "techskills",
        }));

        const softItems: AssetItem[] = softSkills.map((skill: any) => ({
          id: skill.id,
          title: skill.translatedFields[0]?.name || "Untitled",
          subtitle: undefined,
          isInCv: softInCv.some((rel) => rel.softskill_id === skill.id),
          type: "softskills",
        }));

        const sumItems: AssetItem[] = summaries.map((sum: any) => ({
          id: sum.id,
          title:
            sum.translatedFields[0]?.content?.slice(0, 50) + "..." || "Summary",
          subtitle: undefined,
          isInCv: sumInCv.some((rel) => rel.summary_id === sum.id),
          type: "summaries",
        }));

        const langItems: AssetItem[] = languageSkills.map((lang: any) => ({
          id: lang.id,
          title: `${
            lang.translatedFields[0]?.langSkillName || lang.identifier
          } (${lang.levelCode})`,
          subtitle: undefined,
          isInCv: langInCv.some((rel) => rel.language_skill_id === lang.id),
          type: "languageskills",
        }));

        setAssets([
          ...profItems,
          ...sumItems,
          ...expItems,
          ...eduItems,
          ...techItems,
          ...softItems,
          ...langItems,
        ]);
      } catch (error) {
        console.error("Error fetching CV assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetsInCv();
  }, [
    cvId,
    userId,
    education,
    experience,
    professions,
    techSkills,
    softSkills,
    summaries,
    languageSkills,
  ]);

  return { assets, setAssets, loading };
}
