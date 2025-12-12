import { Fragment } from "react";
import type { AssetEditMode, AssetType } from "@/types/assets";
import { assetTypeSupportsTranslations } from "@/types/assets";
import {
  formatAssetMeta,
  formatAssetTitle,
  formatTranslationSummary,
  getLangCode,
  getTranslationsFromAsset,
} from "./formatters";

export interface AssetTableSelection {
  asset: any;
  translation?: any;
  mode: AssetEditMode;
}

export interface AssetTableProps {
  assetType: AssetType;
  assets: any[];
  onRowClick: (selection: AssetTableSelection) => void;
}

export function AssetTable({ assetType, assets, onRowClick }: AssetTableProps) {
  const canTranslate = assetTypeSupportsTranslations[assetType];
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
            {canTranslate ? (
              <th className="px-4 py-3 text-right">
                <button
                  className="px-3 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-50"
                  onClick={() =>
                    onRowClick({ asset: {}, mode: "base" satisfies AssetEditMode })
                  }
                >
                  Add Asset
                </button>
              </th>
            ) : (
              <th className="px-4 py-3" />
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {assets.map((asset) => {
            const translations = getTranslationsFromAsset(asset);
            return (
              <Fragment key={`${assetType}-${asset?.id ?? asset?.name}`}>
                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    onRowClick({ asset, mode: "base" satisfies AssetEditMode })
                  }
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {formatAssetTitle(assetType, asset)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatAssetMeta(assetType, asset)}
                  </td>
                  {canTranslate ? (
                    <td className="px-4 py-3 text-right">
                      <button
                        className="px-3 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick({
                            asset,
                            translation: {},
                            mode: "translation" satisfies AssetEditMode,
                          });
                        }}
                      >
                        Add translation
                      </button>
                    </td>
                  ) : (
                    <td className="px-4 py-3" />
                  )}
                </tr>
                {translations.length === 0
                  ? ""
                  : translations.map((translation, index) => (
                      <tr
                        key={`${asset?.id ?? asset?.name}-translation-${index}`}
                        className="cursor-pointer hover:bg-indigo-50"
                        onClick={() =>
                          onRowClick({
                            asset,
                            translation,
                            mode: "translation" satisfies AssetEditMode,
                          })
                        }
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
