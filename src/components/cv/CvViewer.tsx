import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cv } from "@/domain/Cv";
import { userService } from "@/services/user/UserService";
import { StandardLayout, TwoColumnLayout, IALayout, CvData } from "./layouts";
import { SECTION_TITLES } from "./sectionTitles";
import {
  cvEducationRelations,
  cvExperienceRelations,
  cvLanguageRelations,
  cvProfessionRelations,
  cvSoftSkillRelations,
  cvSummaryRelations,
  cvTechSkillRelations,
} from "@/services/cv/CvRelationsService";
import { calculateOptimalScale } from "@/utils/scaleCalculator";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { useLinguisticContext } from "@/contexts/LinguisticContext";
import { Profession } from "@/domain/Profession";
import { Experience } from "@/domain/Experience";
import { Education } from "@/domain/Education";
import { SoftSkill } from "@/domain/SoftSkill";
import { TechSkill } from "@/domain/TechSkill";
import { Summary } from "@/domain/Summary";
import { LanguageSkill } from "@/domain/LanguageSkill";
import { error, log } from "@/utils/Log";
import { EditAssetModal } from "@/components/dashboard/EditAssetModal";
import { saveAsset } from "@/services/assets/saveAsset";
import { deleteAsset } from "@/services/assets/deleteAsset";
import type { AssetType, AssetEditMode } from "@/types/assets";

interface CvViewerProps {
  cv: Cv;
  assetData?: any;
  onClose: () => void;
}

// SECTION_TITLES moved to dedicated file ./sectionTitles

export const CvViewer: React.FC<CvViewerProps> = ({
  cv,
  assetData,
  onClose,
}) => {
  const [data, setData] = useState<CvData | null>(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<"standard" | "two-column" | "ia">(
    "two-column",
  );
  const [currentLang, setCurrentLang] = useState("en");
  const [downloading, setDownloading] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(0.6);
  const [showWarning, setShowWarning] = useState(false);
  const [singlePageMode, setSinglePageMode] = useState(true);
  const [editModal, setEditModal] = useState<{
    assetType: AssetType;
    asset: any;
    translation?: any | null;
  } | null>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const { languages, loading: languagesLoading } = useLinguisticContext();
  const availableLangs = useMemo(
    () => languages.map((lang) => lang.code),
    [languages],
  );

  const ASSET_DATA_KEYS: Partial<Record<AssetType, string>> = {
    experience: "experience",
    education: "education",
    softskills: "softSkills",
    techskills: "techSkills",
    languageskills: "languageSkills",
    summaries: "summaries",
  };

  const handleItemClick = (assetType: AssetType, itemId: number) => {
    if (!assetData) return;
    const key = ASSET_DATA_KEYS[assetType];
    if (!key) return;
    const assetList: any[] = assetData[key] ?? [];
    const asset = assetList.find((a: any) => a.id === itemId);
    if (!asset) return;

    // Find translation for current language from translatedFields
    const translatedFields = asset.translatedFields ?? [];
    const translation =
      translatedFields.find(
        (t: any) =>
          t.lang_code === currentLang ||
          t.langCode === currentLang ||
          t.lang === currentLang,
      ) || null;

    setEditModal({ assetType, asset, translation });
  };

  const handleModalSave = async (saveData: {
    mode: AssetEditMode;
    values: Record<string, any>;
    asset: any;
    translation?: any | null;
  }) => {
    if (!editModal || !data) return;
    try {
      const assetId =
        saveData.mode === "base"
          ? (saveData.asset?.id ?? null)
          : (saveData.translation?.id ?? null);
      if (saveData.mode === "translation")
        saveData.values.domainId = saveData.translation?.domainId;
      await saveAsset({
        assetType: editModal.assetType,
        mode: saveData.mode,
        assetId,
        values: saveData.values,
      });

      // Update local state with new values
      if (saveData.mode === "translation") {
        // Update the corresponding item in data with new translated field values
        const updateData = { ...data };
        const assetType = editModal.assetType;
        const itemId = editModal.asset.id;

        if (
          assetType === "experience" &&
          Array.isArray(updateData.experience)
        ) {
          const idx = updateData.experience.findIndex((e) => e.id === itemId);
          if (idx >= 0) {
            updateData.experience[idx] = {
              ...updateData.experience[idx],
              ...saveData.values,
            };
          }
        } else if (
          assetType === "education" &&
          Array.isArray(updateData.education)
        ) {
          const idx = updateData.education.findIndex((e) => e.id === itemId);
          if (idx >= 0) {
            updateData.education[idx] = {
              ...updateData.education[idx],
              ...saveData.values,
            };
          }
        } else if (
          assetType === "softskills" &&
          Array.isArray(updateData.softSkills)
        ) {
          const idx = updateData.softSkills.findIndex((e) => e.id === itemId);
          if (idx >= 0) {
            updateData.softSkills[idx] = {
              ...updateData.softSkills[idx],
              ...saveData.values,
            };
          }
        } else if (
          assetType === "languageskills" &&
          Array.isArray(updateData.languages)
        ) {
          const idx = updateData.languages.findIndex((e) => e.id === itemId);
          if (idx >= 0) {
            updateData.languages[idx] = {
              ...updateData.languages[idx],
              ...saveData.values,
            };
          }
        } else if (assetType === "summaries" && updateData.summary) {
          updateData.summary = {
            ...updateData.summary,
            ...saveData.values,
          };
        }

        setData(updateData);
      }

      setEditModal(null);
    } catch (err) {
      error("Error saving asset from CV viewer", err);
    }
  };

  const handleModalDelete = async (deleteData: {
    mode: AssetEditMode;
    asset: any;
    translation?: any | null;
  }) => {
    if (!editModal || !data) return;
    try {
      const assetId =
        deleteData.mode === "base"
          ? (deleteData.asset?.id ?? null)
          : (deleteData.translation?.id ?? null);
      await deleteAsset({
        assetType: editModal.assetType,
        mode: deleteData.mode,
        assetId,
        translation: deleteData.translation,
      });

      // Update local state by removing the item or clearing its translation
      if (deleteData.mode === "translation") {
        const updateData = { ...data };
        const assetType = editModal.assetType;
        const itemId = editModal.asset.id;

        if (
          assetType === "experience" &&
          Array.isArray(updateData.experience)
        ) {
          const idx = updateData.experience.findIndex((e) => e.id === itemId);
          if (idx >= 0) {
            // Clear translated fields for this language
            updateData.experience[idx] = {
              ...updateData.experience[idx],
              jobTitle: undefined,
              description: undefined,
            };
          }
        } else if (
          assetType === "education" &&
          Array.isArray(updateData.education)
        ) {
          const idx = updateData.education.findIndex((e) => e.id === itemId);
          if (idx >= 0) {
            updateData.education[idx] = {
              ...updateData.education[idx],
              title: undefined,
              description: undefined,
            };
          }
        } else if (
          assetType === "softskills" &&
          Array.isArray(updateData.softSkills)
        ) {
          const idx = updateData.softSkills.findIndex((e) => e.id === itemId);
          if (idx >= 0) {
            updateData.softSkills[idx] = {
              ...updateData.softSkills[idx],
              key: undefined,
            };
          }
        } else if (
          assetType === "languageskills" &&
          Array.isArray(updateData.languages)
        ) {
          const idx = updateData.languages.findIndex((e) => e.id === itemId);
          if (idx >= 0) {
            updateData.languages[idx] = {
              ...updateData.languages[idx],
              name: undefined,
            };
          }
        } else if (assetType === "summaries" && updateData.summary) {
          updateData.summary = {
            ...updateData.summary,
            content: undefined,
          };
        }

        setData(updateData);
      }

      setEditModal(null);
    } catch (err) {
      error("Error deleting asset from CV viewer", err);
    }
  };

  const handleDownloadPdf = async () => {
    if (!cvRef.current) return;
    try {
      setDownloading(true);
      const { exportElementToPdf } = await import("@/utils/pdf");
      const safeName = cv.title ?? data?.user.fullName ?? "cv";
      await exportElementToPdf(cvRef.current, `${safeName}-${currentLang}.pdf`);
    } catch (err) {
      error("Error exporting CV PDF:", err);
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

        const profession = await cvProfessionRelations
          .getAssetsForCv(
            cv.id,
            assetData?.professions.map(Profession.deSerialize) || [],
            currentLang,
          )
          .then((profs) => profs[0]);
        if (profession) {
          user.profession = profession;
        }
        // 2. Fetch Translated Data
        const summary = await cvSummaryRelations
          .getAssetsForCv(
            cv.id,
            assetData?.summaries.map(Summary.deSerialize) || [],
            currentLang,
          )
          .then((summaries) => summaries[0]);
        const experience = await cvExperienceRelations.getAssetsForCv(
          cv.id,
          assetData?.experience.map(Experience.deSerialize) || [],
          currentLang,
        );
        const education = await cvEducationRelations.getAssetsForCv(
          cv.id,
          assetData?.education.map(Education.deSerialize) || [],
          currentLang,
        );
        const softSkills = await cvSoftSkillRelations.getAssetsForCv(
          cv.id,
          assetData?.softSkills.map(SoftSkill.deSerialize) || [],
          currentLang,
        );
        const languagesForCv = await cvLanguageRelations.getAssetsForCv(
          cv.id,
          assetData?.languageSkills.map(LanguageSkill.deSerialize) || [],
          currentLang,
        );

        const techSkills = await cvTechSkillRelations.getAssetsForCv(
          cv.id,
          assetData?.techSkills.map(TechSkill.deSerialize) || [],
        );

        setData({
          user,
          summary,
          experience,
          education,
          languages: languagesForCv ?? [],
          softSkills,
          techSkills,
        });
      } catch (err) {
        error("Error fetching CV data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cv.userId, cv.id, currentLang, languages, assetData]);

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
        cvRef.current!,
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
    <>
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
              ⚠️ Content is too large to fit on one A4 page. Please reduce
              content or adjust layout.
            </div>
          )}
          <div style={{ "--scale-factor": scaleFactor } as React.CSSProperties}>
            {layout === "standard" && (
              <StandardLayout
                data={data}
                labels={labels}
                ref={cvRef}
                onItemClick={downloading ? undefined : handleItemClick}
              />
            )}
            {layout === "two-column" && (
              <TwoColumnLayout
                data={data}
                labels={labels}
                ref={cvRef}
                onItemClick={downloading ? undefined : handleItemClick}
              />
            )}
            {layout === "ia" && (
              <IALayout
                data={data}
                labels={labels}
                ref={cvRef}
                onItemClick={downloading ? undefined : handleItemClick}
              />
            )}
          </div>
        </div>
      </div>

      {editModal && (
        <EditAssetModal
          isOpen={true}
          assetType={editModal.assetType}
          asset={editModal.asset}
          translation={editModal.translation}
          mode="translation"
          onClose={() => setEditModal(null)}
          onSave={handleModalSave}
          onDelete={handleModalDelete}
        />
      )}
    </>
  );
};
