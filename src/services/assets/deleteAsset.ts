import type { AssetEditMode, AssetType } from "@/types/assets";
import { assetServiceRegistry } from "./serviceRegistry";

interface DeleteAssetParams {
  assetType: AssetType;
  mode: AssetEditMode;
  assetId: number | string | null;
  translation?: any | null;
}

function getTranslationLangCode(translation: any): string | null {
  return (
    translation?.langCode ??
    translation?.lang_code ??
    translation?.lang ??
    null
  );
}

function getTranslationDomainId(translation: any): number | string | null {
  if (!translation) return null;
  if (translation.domainId != null) return translation.domainId;
  if (translation.domain_id != null) return translation.domain_id;

  const possibleId = Object.entries(translation).find(([key]) =>
    key.endsWith("_id")
  );
  return possibleId ? (possibleId[1] as number | string) : null;
}

export async function deleteAsset({
  assetType,
  mode,
  assetId,
  translation,
}: DeleteAssetParams) {
  const entry = assetServiceRegistry[assetType];
  if (!entry) throw new Error(`Unknown asset type: ${assetType}`);

  const service = entry.service as any;

  if (mode === "base") {
    if (assetId == null) {
      throw new Error("Asset ID is required to delete a base asset");
    }
    return service.delete(assetId);
  }

  if (!entry.translatable) {
    throw new Error(`Translations are not supported for ${assetType}`);
  }

  if (typeof service.deleteTranslation !== "function") {
    throw new Error(
      `Translation methods not available for asset type ${assetType}`
    );
  }

  const langCode = getTranslationLangCode(translation);
  const domainId =
    getTranslationDomainId(translation) ?? assetId ?? translation?.domainId;

  if (!langCode) {
    throw new Error("lang_code is required to delete a translation");
  }
  if (domainId == null) {
    throw new Error("domain_id is required to delete a translation");
  }

  return service.deleteTranslation(domainId, langCode);
}
