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

import { error, log } from "@/utils/Log";

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
  const [trigger, setTrigger] = useState(0);

  const refreshAssets = () => setTrigger((prev) => prev + 1);

  const findAndPosition = (
    item: { id: number },
    list: any[],
    domainIdKey: string
  ): {
    isInCv: boolean;
    position: number | undefined;
    relationId: number | undefined;
  } => {
    let found = false;
    let position: number | undefined = undefined;
    let relationId: number | undefined = undefined;
    list.forEach((elem) => {
      if (elem[domainIdKey] === item.id) {
        found = true;
        position = elem.position ?? position;
        relationId = elem.id ?? relationId;
      }
    });
    return { isInCv: found, position, relationId };
  };

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
        const eduItems: AssetItem[] = education.map((edu: any) => {
          const { isInCv, position, relationId } = findAndPosition(
            edu,
            eduInCv,
            cvEducationRelations.domainIdField as string
          );
          return {
            id: edu.id,
            title: edu.institution,
            subtitle: edu.translatedFields[0]?.title || "",
            position,
            relationId,
            isInCv,
            type: "education",
          };
        });

        const expItems: AssetItem[] = experience.map((exp: any) => {
          const { isInCv, position, relationId } = findAndPosition(
            exp,
            expInCv,
            cvExperienceRelations.domainIdField as string
          );
          return {
            id: exp.id,
            title: exp.company,
            subtitle: exp.translatedFields[0]?.jobTitle || "",
            position,
            relationId,
            isInCv,
            type: "experience",
          };
        });

        const profItems: AssetItem[] = professions.map((prof: any) => ({
          id: prof.id,
          title: prof.translatedFields[0]?.title || "Untitled",
          subtitle: prof.translatedFields[0]?.description || "",
          isInCv: profInCv.some((rel) => rel.profession_id === prof.id),
          type: "profession",
        }));

        const techItems: AssetItem[] = techSkills.map((skill: any) => {
          const { isInCv, position, relationId } = findAndPosition(
            skill,
            techInCv,
            cvTechSkillRelations.domainIdField as string
          );
          return {
            id: skill.id,
            title: skill.name,
            subtitle: undefined,
            position,
            relationId,
            isInCv,
            type: "techskills",
          };
        });

        const softItems: AssetItem[] = softSkills.map((skill: any) => {
          const { isInCv, position, relationId } = findAndPosition(
            skill,
            softInCv,
            cvSoftSkillRelations.domainIdField as string
          );
          return {
            id: skill.id,
            title: skill.translatedFields[0]?.name || "Untitled",
            subtitle: undefined,
            position,
            relationId,
            isInCv,
            type: "softskills",
          };
        });

        const sumItems: AssetItem[] = summaries.map((sum: any) => ({
          id: sum.id,
          title:
            sum.translatedFields[0]?.content?.slice(0, 50) + "..." || "Summary",
          subtitle: undefined,
          isInCv: sumInCv.some((rel) => rel.summary_id === sum.id),
          type: "summaries",
        }));

        const langItems: AssetItem[] = languageSkills.map((lang: any) => {
          const { isInCv, position, relationId } = findAndPosition(
            lang,
            langInCv,
            cvLanguageRelations.domainIdField as string
          );
          return {
            id: lang.id,
            title: `${
              lang.translatedFields[0]?.langSkillName || lang.identifier
            } (${lang.levelCode})`,
            subtitle: undefined,
            position,
            relationId,
            isInCv,
            type: "languageskills",
          };
        });

        setAssets([
          ...profItems,
          ...sumItems,
          ...expItems,
          ...eduItems,
          ...techItems,
          ...softItems,
          ...langItems,
        ]);
      } catch (err) {
        error("Error fetching CV assets:", err);
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
    trigger,
  ]);

  return { assets, setAssets, loading, refreshAssets };
}
