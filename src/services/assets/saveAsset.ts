import type { AssetEditMode, AssetType } from "@/types/assets";
import { assetServiceRegistry } from "./serviceRegistry";

interface SaveAssetParams {
  assetType: AssetType;
  mode: AssetEditMode;
  assetId: number | string | null;
  values: Record<string, any>;
}

function toSnakeCase(key: string): string {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function normalizeValues(
  values: Record<string, any>
): Record<string, any> {
  return Object.entries(values || {}).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      const snakeKey = toSnakeCase(key);
      acc[snakeKey] = value;
      return acc;
    },
    {}
  );
}

export async function saveAsset({
  assetType,
  mode,
  assetId,
  values,
}: SaveAssetParams) {
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
  if (assetId == null) {
    throw new Error("assetId is required to save a translation");
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
  if (assetId == null)
    return service.createTranslation(assetId, langCode, normalizedTranslation);
  return service.updateTranslation(
    normalizedTranslation.domainId,
    langCode,
    normalizedTranslation
  );
}
