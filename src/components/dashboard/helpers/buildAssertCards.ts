import { ReactNode } from "react";
import type { AssetType } from "@/types/assets";
import type { AssetsGridProps } from "../AssetsGrid";

type AssetColor = "blue" | "green" | "purple" | "pink" | "orange" | "indigo";

export default function buildAssetCards({
  education,
  experience,
  professions,
  techSkills,
  softSkills,
  summaries,
  languageSkills,
}: AssetsGridProps) {
  return [
    {
      assetType: "education" as AssetType,
      title: "Education",
      count: education.length,
      assets: education,
      color: "blue" as AssetColor,
      icon: "🎓" as ReactNode,
    },
    {
      assetType: "experience" as AssetType,
      title: "Experience",
      count: experience.length,
      assets: experience,
      color: "green" as AssetColor,
      icon: "💼" as ReactNode,
    },
    {
      assetType: "profession" as AssetType,
      title: "Profession",
      count: professions.length,
      assets: professions,
      color: "purple" as AssetColor,
      icon: "🧭" as ReactNode,
    },
    {
      assetType: "techskills" as AssetType,
      title: "Tech Skills",
      count: techSkills.length,
      assets: techSkills,
      color: "pink" as AssetColor,
      icon: "🛠️" as ReactNode,
    },
    {
      assetType: "softskills" as AssetType,
      title: "Soft Skills",
      count: softSkills.length,
      assets: softSkills,
      color: "orange" as AssetColor,
      icon: "🤝" as ReactNode,
    },
    {
      assetType: "summaries" as AssetType,
      title: "Summaries",
      count: summaries.length,
      assets: summaries,
      color: "indigo" as AssetColor,
      icon: "📝" as ReactNode,
    },
    {
      assetType: "languageskills" as AssetType,
      title: "Language Skills",
      count: languageSkills.length,
      assets: languageSkills,
      color: "blue" as AssetColor,
      icon: "🌐" as ReactNode,
    },
  ];
}
