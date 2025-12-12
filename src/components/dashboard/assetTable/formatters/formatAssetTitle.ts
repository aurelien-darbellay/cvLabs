import type { AssetType } from "@/types/assets";

export function formatAssetTitle(assetType: AssetType, asset: any): string {
  switch (assetType) {
    case "education":
      return asset?.institution || `Education #${asset?.id ?? "?"}`;
    case "experience":
      return (
        `${asset?.company} (${asset?.translatedFields[0]?.jobTitle})` ||
        `Experience #${asset?.id ?? "?"}`
      );
    case "profession":
      return (
        asset?.translatedFields?.[0]?.title ||
        asset?.title ||
        `Profession #${asset?.id ?? "?"}`
      );
    case "techskills":
      return asset?.name || `Tech skill #${asset?.id ?? "?"}`;
    case "softskills":
      return (
        asset?.key ||
        asset?.title ||
        asset?.name ||
        `Soft skill #${asset?.id ?? "?"}`
      );
    case "summaries":
      return asset?.shortDescription || `Summary #${asset?.id ?? "?"}`;
    default:
      return `Asset #${asset?.id ?? "?"}`;
  }
}
