import {
  formatAssetMeta,
  formatAssetTitle,
  formatTranslationSummary,
  getLangCode,
} from "./AssetTable";
import type { AssetType } from "@/types/assets";

interface EditAssetModalProps {
  isOpen: boolean;
  assetType: AssetType;
  asset: any | null;
  translation?: any | null;
  onClose: () => void;
}

export function EditAssetModal({
  isOpen,
  assetType,
  asset,
  translation,
  onClose,
}: EditAssetModalProps) {
  if (!isOpen || !asset) return null;

  const translationLang = translation ? getLangCode(translation) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase text-gray-500 font-semibold">
              Edit {assetType}
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {formatAssetTitle(assetType, asset)}
            </h3>
            <p className="text-sm text-gray-600">
              {formatAssetMeta(assetType, asset)}
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close edit modal"
          >
            ×
          </button>
        </div>

        {translation ? (
          <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              Translation · {translationLang}
            </p>
            <p className="text-sm text-gray-800">
              {formatTranslationSummary(assetType, translation)}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-md p-3">
            <p className="text-sm text-gray-600">
              This asset has no selected translation. Click a translation row to
              edit it directly.
            </p>
          </div>
        )}

        <div className="rounded-md border border-dashed border-gray-200 p-4 text-sm text-gray-600">
          Editing form goes here. Wire up fields for the asset and its
          translation when APIs are ready.
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold cursor-not-allowed opacity-70"
            disabled
          >
            Save (coming soon)
          </button>
        </div>
      </div>
    </div>
  );
}
