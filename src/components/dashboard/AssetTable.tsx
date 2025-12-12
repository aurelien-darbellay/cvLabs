import { Fragment } from "react";
import type { AssetType } from "@/types/assets";

export interface AssetTableProps {
  assetType: AssetType;
  assets: any[];
  onRowClick: (asset: any, translation?: any) => void;
}

export function getLangCode(translation: any): string {
  return (
    translation?.lang_code || translation?.langCode || translation?.lang || "—"
  );
}

export function getTranslationsFromAsset(asset: any): any[] {
  if (Array.isArray(asset?.translatedFields)) {
    return asset.translatedFields;
  }
  if (Array.isArray(asset?.translations)) {
    return asset.translations;
  }
  return [];
}

export function formatAssetTitle(assetType: AssetType, asset: any): string {
  switch (assetType) {
    case "education":
      return asset?.institution || `Education #${asset?.id ?? "?"}`;
    case "experience":
      return (
        `${asset?.company} - ${
          asset?.translatedFields[0]?.jobTitle || "No job title"
        }` || `Experience #${asset?.id ?? "?"}`
      );
    case "profession":
      return (
        asset?.translatedFields[0]?.title || `Profession #${asset?.id ?? "?"}`
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

export function formatAssetMeta(assetType: AssetType, asset: any): string {
  switch (assetType) {
    case "education": {
      const range =
        asset?.startYear || asset?.endYear
          ? `${asset?.startYear ?? "?"} - ${asset?.endYear ?? "?"}`
          : "No dates";
      return range;
    }
    case "experience": {
      const start = asset?.startDate
        ? new Date(asset.startDate).getFullYear()
        : null;
      const end = asset?.isCurrent
        ? "Present"
        : asset?.endDate
        ? new Date(asset.endDate).getFullYear()
        : null;
      const range =
        start || end ? `${start ?? "?"} - ${end ?? "?"}` : "No dates";
      return range;
    }
    case "profession":
      return asset?.ownerId ? `Owner: ${asset.ownerId}` : "Profession";
    case "techskills":
      return "Single language";
    case "softskills":
      return asset?.ownerId ? `Owner: ${asset.ownerId}` : "Soft skill";
    case "summaries":
      return "Summary translations";
    default:
      return "";
  }
}

export function formatTranslationSummary(
  assetType: AssetType,
  translation: any
): string {
  switch (assetType) {
    case "education":
    case "profession":
      return translation?.title
        ? `${translation.title}${
            translation.description ? ` — ${translation.description}` : ""
          }`
        : translation?.description || "No details";
    case "experience":
      return translation?.jobTitle
        ? `${translation.jobTitle}${
            translation.description ? ` — ${translation.description}` : ""
          }`
        : translation?.description || "No details";
    case "softskills":
      return translation?.name || translation?.title || "No details";
    case "summaries":
      return translation?.content || "No details";
    case "techskills":
      return translation?.name || "No translations";
    default:
      return "No details";
  }
}

export function AssetTable({ assetType, assets, onRowClick }: AssetTableProps) {
  console.log("Rendering AssetTable with assets:", assets);
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {assets.map((asset) => {
            const translations = getTranslationsFromAsset(asset);
            return (
              <Fragment key={`${assetType}-${asset?.id ?? asset?.name}`}>
                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => onRowClick(asset)}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {formatAssetTitle(assetType, asset)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatAssetMeta(assetType, asset)}
                  </td>
                </tr>
                {translations.length === 0
                  ? ""
                  : translations.map((translation, index) => (
                      <tr
                        key={`${asset?.id ?? asset?.name}-translation-${index}`}
                        className="cursor-pointer hover:bg-indigo-50"
                        onClick={() => onRowClick(asset, translation)}
                      >
                        <td className="px-4 py-3 pl-10 text-sm font-medium text-gray-700">
                          {getLangCode(translation)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatTranslationSummary(assetType, translation)}
                        </td>
                      </tr>
                    ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
