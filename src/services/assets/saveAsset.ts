import type { AssetEditMode, AssetType } from "@/types/assets";
import { assetServiceRegistry } from "./serviceRegistry";
import normalizeValues from "@/utils/normalizeValues";

interface SaveAssetParams {
  assetType: AssetType;
  mode: AssetEditMode;
  assetId: number | string | null;
  values: Record<string, any>;
}

export async function saveAsset({
  assetType,
  mode,
  assetId,
  values,
}: SaveAssetParams) {
  console.log("saveAsset called", { assetType, mode, assetId, values });
  const entry = assetServiceRegistry[assetType];
  if (!entry) {
    throw new Error(`Unknown asset type: ${assetType}`);
  }

  const service = entry.service as any;
  if (mode === "base") {
    const payload = normalizeValues(values);
    if (assetId == null) {
      return service.create(payload);
    }
    return service.update(assetId, payload);
  }

  // translation mode
  if (!entry.translatable) {
    throw new Error(`Translations are not supported for ${assetType}`);
  }
  const langCode = values.langCode ?? values.lang_code;
  if (!langCode) {
    throw new Error("lang_code is required for translations");
  }

  const translationPayload = { ...values };
  const normalizedTranslation = normalizeValues(translationPayload);
  if (typeof service.updateTranslation !== "function") {
    throw new Error(
      `Translation methods not available for asset type ${assetType}`
    );
  }
  const { domain_id, ...updates } = normalizedTranslation;
  if (assetId == null)
    return service.createTranslation(domain_id, langCode, updates);
  return service.updateTranslation(domain_id, langCode, updates);
}
