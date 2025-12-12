import { AssetCard } from "./AssetCard";
import type { Education } from "@/domain/Education";
import type { Experience } from "@/domain/Experience";
import type { Profession } from "@/domain/Profession";
import type { TechSkill } from "@/domain/TechSkill";
import type { SoftSkill } from "@/domain/SoftSkill";
import type { Summary } from "@/domain/Summary";
import buildAssetCards from "./helpers/buildAssertCards";

export interface AssetsGridProps {
  education: Education[];
  experience: Experience[];
  professions: Profession[];
  techSkills: TechSkill[];
  softSkills: SoftSkill[];
  summaries: Summary[];
}

export function AssetsGrid(props: AssetsGridProps) {
  const assetCards = buildAssetCards(props);

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Assets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assetCards.map((card) => (
          <AssetCard key={card.assetType} {...card} />
        ))}
      </div>
    </section>
  );
}
