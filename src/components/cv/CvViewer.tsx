import React, { useEffect, useMemo, useState } from "react";
import { Cv } from "@/domain/Cv";
import { Language } from "@/domain/Language";
import { SoftSkill } from "@/domain/SoftSkill";
import { TechSkill } from "@/domain/TechSkill";
import { userService } from "@/services/user/UserService";
import { supabase } from "@/lib/supabaseClient";
import {
  StandardLayout,
  TwoColumnLayout,
  IALayout,
  CvData,
  LayoutLabels,
} from "./layouts";
import { translationService } from "@/services/cv/TranslationService";
import { languageService } from "@/services/skills/LanguageService";
import { cvService } from "@/services/cv/CvService";
import { cvRelationsService } from "@/services/cv/CvRelationsService";

interface CvViewerProps {
  cv: Cv;
  onClose: () => void;
}

const SECTION_TITLES: Record<string, LayoutLabels> = {
  en: {
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    tech: "Tech",
    soft: "Soft",
    languages: "Languages",
    contact: "Contact",
    profile: "Profile",
  },
  es: {
    summary: "Resumen",
    experience: "Experiencia",
    education: "Educación",
    skills: "Habilidades",
    tech: "Técnicas",
    soft: "Blandas",
    languages: "Idiomas",
    contact: "Contacto",
    profile: "Perfil",
  },
};

export const CvViewer: React.FC<CvViewerProps> = ({ cv, onClose }) => {
  const [data, setData] = useState<CvData | null>(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<"standard" | "two-column" | "ia">(
    "two-column"
  );
  const [currentLang, setCurrentLang] = useState("en");
  const [languages, setLanguages] = useState<Language[]>([]);
  console.log(languages);

  useEffect(() => {
    // Fetch available languages
    const fetchLangs = async () => {
      const langs = await languageService.list();
      setLanguages(langs);
    };
    fetchLangs();
  }, []);

  const availableLangs = useMemo(
    () => languages.map((lang) => lang.code),
    [languages]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch User
        const user = await userService.getById(cv.userId);
        if (!user) throw new Error("User not found");

        // 2. Fetch Translated Data
        const summary = await translationService.getSummaryForCv(
          cv.id,
          currentLang
        );
        const experience = await translationService.getTranslatedExperience(
          cv.userId,
          currentLang
        );
        const education = await translationService.getTranslatedEducation(
          cv.userId,
          currentLang
        );
        const softSkills = await translationService.getTranslatedSoftSkills(
          cv.userId,
          currentLang
        );

        const techData = await cvRelationsService.getTechSkillsForCv(cv.id);
        const techSkills = (techData || []).map(TechSkill.fromRow);

        setData({
          user,
          summary,
          experience,
          education,
          languages,
          softSkills,
          techSkills,
        });
      } catch (error) {
        console.error("Error fetching CV data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cv.userId, currentLang]);

  if (loading) return <div className="p-8 text-center">Loading CV...</div>;
  if (!data) return <div className="p-8 text-center">Error loading data</div>;

  const labels = SECTION_TITLES[currentLang] || SECTION_TITLES["en"];

  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 bg-white bg-opacity-95 shadow-md p-4 z-10 flex gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded"
        >
          Back
        </button>

        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value as any)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="standard">Standard Layout</option>
          <option value="two-column">Two Column Layout</option>
          <option value="ia">Impact/Academic Layout</option>
        </select>

        <select
          value={currentLang}
          onChange={(e) => setCurrentLang(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {availableLangs.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        {layout === "standard" && (
          <StandardLayout data={data} labels={labels} />
        )}
        {layout === "two-column" && (
          <TwoColumnLayout data={data} labels={labels} />
        )}
        {layout === "ia" && <IALayout data={data} labels={labels} />}
      </div>
    </div>
  );
};
