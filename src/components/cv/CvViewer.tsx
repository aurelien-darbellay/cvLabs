import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cv } from "@/domain/Cv";
import { TechSkill } from "@/domain/TechSkill";
import { userService } from "@/services/user/UserService";
import {
  StandardLayout,
  TwoColumnLayout,
  IALayout,
  CvData,
  LayoutLabels,
} from "./layouts";
import { translationService } from "@/services/cv/TranslationService";
import { cvRelationsService } from "@/services/cv/CvRelationsService";
import { calculateOptimalScale } from "@/utils/scaleCalculator";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { useLinguisticContext } from "@/contexts/LinguisticContext";

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
  const [downloading, setDownloading] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(0.6);
  const [showWarning, setShowWarning] = useState(false);
  const [singlePageMode, setSinglePageMode] = useState(true);
  const cvRef = useRef<HTMLDivElement>(null);

  const { languages, loading: languagesLoading } = useLinguisticContext();

  const availableLangs = useMemo(
    () => languages.map((lang) => lang.code),
    [languages]
  );

  const handleDownloadPdf = async () => {
    if (!cvRef.current) return;
    try {
      setDownloading(true);
      const { exportElementToPdf } = await import("@/utils/pdf");
      const safeName = data?.user.fullName || "cv";
      await exportElementToPdf(cvRef.current, `${safeName}-${currentLang}.pdf`);
    } catch (error) {
      console.error("Error exporting CV PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch User
        const user = await userService.getById(cv.userId);
        if (!user) throw new Error("User not found");

        const profession = await translationService.getProfessionForCv(
          cv.id,
          currentLang
        );
        if (profession) {
          user.profession = profession;
        }

        // 2. Fetch Translated Data
        const summary = await translationService.getSummaryForCv(
          cv.id,
          currentLang
        );
        const experience = await translationService.getExperienceForCv(
          cv.id,
          currentLang
        );
        const education = await translationService.getEducationForCv(
          cv.id,
          currentLang
        );
        const softSkills = await translationService.getSoftSkillsForCv(
          cv.id,
          currentLang
        );

        const languagesForCv = await translationService.getLanguagesForCv(
          cv.id,
          currentLang
        );
        console.log("Fetched languages for CV:", languagesForCv);

        const techData = await cvRelationsService.getTechSkillsForCv(cv.id);
        const techSkills = (techData || []).map(TechSkill.fromRow);

        setData({
          user,
          summary,
          experience,
          education,
          languages: languagesForCv ?? [],
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
  }, [cv.userId, cv.id, currentLang, languages]);

  // Auto-adjust scale to fit A4 height
  useEffect(() => {
    if (!singlePageMode) {
      setScaleFactor(1);
      setShowWarning(false);
      return;
    }

    if (!cvRef.current || !data) return;

    const adjustScale = () => {
      const currentHeight = cvRef.current!.scrollHeight;
      const result = calculateOptimalScale(
        currentHeight,
        scaleFactor,
        cvRef.current!
      );

      setScaleFactor(result.scaleFactor);
      setShowWarning(result.showWarning);
    };

    // Debounce to avoid excessive recalculations
    const timer = setTimeout(adjustScale, 300);
    return () => clearTimeout(timer);
  }, [data, layout, currentLang, cvRef.current, singlePageMode]);

  if (loading || languagesLoading) return <LoadingSpinner />;
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

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={singlePageMode}
            onChange={(e) => setSinglePageMode(e.target.checked)}
            className="cursor-pointer"
          />
          Single page fit
        </label>

        <button
          onClick={handleDownloadPdf}
          disabled={downloading}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 rounded disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {downloading ? "Exporting..." : "Download PDF"}
        </button>
      </div>

      <div className="min-h-screen bg-gray-100 p-10">
        {showWarning && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
            ⚠️ Content is too large to fit on one A4 page. Please reduce content
            or adjust layout.
          </div>
        )}
        <div style={{ "--scale-factor": scaleFactor } as React.CSSProperties}>
          {layout === "standard" && (
            <StandardLayout data={data} labels={labels} ref={cvRef} />
          )}
          {layout === "two-column" && (
            <TwoColumnLayout data={data} labels={labels} ref={cvRef} />
          )}
          {layout === "ia" && (
            <IALayout data={data} labels={labels} ref={cvRef} />
          )}
        </div>
      </div>
    </div>
  );
};
