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

/**
 * Normalizes empty string values to null for database compatibility.
 * PostgreSQL doesn't accept empty strings for date, number, or other typed columns.
 */
function normalizeEmptyValues(value: any): any {
  // Convert empty strings to null
  if (value === "") {
    return null;
  }

  // Recursively handle arrays
  if (Array.isArray(value)) {
    return value.length === 0 ? null : value;
  }

  // Recursively handle objects
  if (value && typeof value === "object") {
    return Object.entries(value).reduce<Record<string, any>>((acc, [k, v]) => {
      acc[k] = normalizeEmptyValues(v);
      return acc;
    }, {});
  }

  return value;
}

export function normalizeValues(
  values: Record<string, any>
): Record<string, any> {
  return Object.entries(values || {}).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      const snakeKey = toSnakeCase(key);
      acc[snakeKey] = normalizeEmptyValues(value);
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
