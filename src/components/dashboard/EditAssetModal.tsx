import {
  formatAssetMeta,
  formatAssetTitle,
  formatTranslationSummary,
  getLangCode,
} from "./assetTable/formatters";
import { AssetForm } from "./assetForm/AssetForm";
import type { AssetEditMode, AssetType } from "@/types/assets";
import { useAssetFields } from "./helpers/getAssetFields";

interface EditAssetModalProps {
  isOpen: boolean;
  assetType: AssetType;
  asset: any | null;
  translation?: any | null;
  mode: AssetEditMode;
  onClose: () => void;
  onSave?: (payload: {
    mode: AssetEditMode;
    values: Record<string, any>;
    asset: any;
    translation?: any | null;
  }) => void;
}

export function EditAssetModal({
  isOpen,
  assetType,
  asset,
  translation,
  mode,
  onClose,
  onSave,
}: EditAssetModalProps) {
  if (!isOpen || !asset) return null;

  const isTranslationMode = mode === "translation";
  const translationLang = translation ? getLangCode(translation) : null;
  const fields = useAssetFields(assetType, mode);
  const initialValues = isTranslationMode
    ? {
        ...(translation ?? {}),
        ...(translation?.langCode
          ? {}
          : { langCode: translation?.lang_code ?? translation?.lang ?? "" }),
      }
    : asset ?? {};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase text-gray-500 font-semibold">
              Edit {isTranslationMode ? "translation" : "base"} · {assetType}
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

        {isTranslationMode && translation ? (
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
              {isTranslationMode
                ? "No translation selected."
                : "You are editing the base fields for this asset."}
            </p>
          </div>
        )}

        <AssetForm
          fields={fields}
          values={initialValues}
          onSubmit={(values) => onSave?.({ mode, values, asset, translation })}
        />
      </div>
    </div>
  );
}
