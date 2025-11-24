import React, { useEffect, useState } from "react";
import { Cv } from "@/domain/Cv";
import { Experience } from "@/domain/Experience";
import { Education } from "@/domain/Education";
import { Summary } from "@/domain/Summary";
import { Language } from "@/domain/Language";
import { SoftSkill } from "@/domain/SoftSkill";
import { TechSkill } from "@/domain/TechSkill";
import { userService } from "@/services/user/UserService";
import { cvService } from "@/services/cv/CvService";
import { languageService } from "@/services/skills/LanguageService";
import { techSkillService } from "@/services/skills/TechSkillService";
import { StandardLayout, TwoColumnLayout, IALayout, CvData, LayoutLabels } from "./Layouts";
import { translationService } from "@/services/cv/TranslationService";

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
        profile: "Profile"
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
        profile: "Perfil"
    }
};

export const CvViewer: React.FC<CvViewerProps> = ({ cv, onClose }) => {
    const [data, setData] = useState<CvData | null>(null);
    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState<"standard" | "two-column" | "ia">("standard");
    const [currentLang, setCurrentLang] = useState("en");
    const [availableLangs, setAvailableLangs] = useState<Language[]>([]);
    console.log(availableLangs)

    useEffect(() => {
        // Fetch available languages for this user (based on CVs or just hardcoded for now)
        // Ideally we check what translations exist, but for now let's assume if they have a CV in that lang, they might have translations
        // Or better, just fetch distinct languages from the translations tables? 
        // For simplicity, let's use the languages from the user's CVs list as a proxy for "available languages"
        const fetchLangs = async () => {
            const langs = await languageService.list();
            setAvailableLangs(langs);
        };
        fetchLangs();
    }, [cv.userId]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch User
                const user = await userService.getById(cv.userId);
                if (!user) throw new Error("User not found");

                // 2. Fetch Translated Data
                console.log("Fetching translated data for lang:", currentLang);
                const summary = await translationService.getSummaryForCv(cv.id, currentLang);
                const experience = await translationService.getTranslatedExperience(cv.userId, currentLang);
                const education = await translationService.getTranslatedEducation(cv.userId, currentLang);
                const softSkills = await translationService.getTranslatedSoftSkills(cv.userId, currentLang);

                // 3. Fetch Global Data
                const languages = await languageService.list();
                const techSkills = await techSkillService.list();

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

    if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading CV...</div>;
    if (!data) return <div style={{ padding: "2rem", textAlign: "center" }}>Error loading data</div>;

    // Inject translated titles into data or pass them to layout?
    // For now, let's pass a "labels" object to the layout if we were refactoring layouts, 
    // but since layouts are hardcoded, we might need to wrap them or pass the lang code.
    // Let's modify the Layouts component to accept labels or lang code.
    // For this iteration, I will just pass the data. The layouts currently have hardcoded English headers.
    // I should update Layouts.tsx to accept labels.

    const labels = SECTION_TITLES[currentLang] || SECTION_TITLES["en"];

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "white", zIndex: 2000, overflowY: "auto" }}>
            <div style={{ position: "fixed", top: "1rem", left: "1rem", display: "flex", gap: "1rem", zIndex: 2001, backgroundColor: "rgba(255,255,255,0.9)", padding: "0.5rem", borderRadius: "4px" }}>
                <button onClick={onClose} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Back</button>

                <select
                    value={layout}
                    onChange={(e) => setLayout(e.target.value as any)}
                    style={{ padding: "0.5rem" }}
                >
                    <option value="standard">Standard Layout</option>
                    <option value="two-column">Two Column Layout</option>
                    <option value="ia">Impact/Academic Layout</option>
                </select>

                <select
                    value={currentLang}
                    onChange={(e) => setCurrentLang(e.target.value)}
                    style={{ padding: "0.5rem" }}
                >
                    {availableLangs.map(lang => (
                        <option key={lang.id} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginTop: "4rem" }}>
                {/* We need to pass labels to layouts. I'll update Layouts.tsx next. */}
                {layout === "standard" && <StandardLayout data={data} labels={labels} />}
                {layout === "two-column" && <TwoColumnLayout data={data} labels={labels} />}
                {layout === "ia" && <IALayout data={data} labels={labels} />}
            </div>
        </div>
    );
};
