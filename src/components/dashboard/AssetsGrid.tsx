import { AssetCard } from "./AssetCard";

interface AssetsGridProps {
  educationCount: number;
  experienceCount: number;
  professionCount: number;
  techSkillsCount: number;
  softSkillsCount: number;
  summariesCount: number;
}

export function AssetsGrid({
  educationCount,
  experienceCount,
  professionCount,
  techSkillsCount,
  softSkillsCount,
  summariesCount,
}: AssetsGridProps) {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Assets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AssetCard
          icon="🎓"
          title="Education"
          count={educationCount}
          assetType="education"
          color="blue"
        />
        <AssetCard
          icon="💼"
          title="Experience"
          count={experienceCount}
          assetType="experience"
          color="green"
        />
        <AssetCard
          icon="👔"
          title="Profession"
          count={professionCount}
          assetType="profession"
          color="purple"
        />
        <AssetCard
          icon="⚙️"
          title="Tech Skills"
          count={techSkillsCount}
          assetType="techskills"
          color="pink"
        />
        <AssetCard
          icon="🌟"
          title="Soft Skills"
          count={softSkillsCount}
          assetType="softskills"
          color="orange"
        />
        <AssetCard
          icon="📝"
          title="Summaries"
          count={summariesCount}
          assetType="summaries"
          color="indigo"
        />
      </div>
    </section>
  );
}
