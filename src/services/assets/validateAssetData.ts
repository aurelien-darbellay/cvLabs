import type { AssetType } from "@/types/assets";

export interface TranslatedEntity {
  langCode?: string;
  [key: string]: any;
}

export function validateAssetData(
  assetType: AssetType,
  newAssetValues: any,
  oldAssetValues: any
): string[] {
  const errors: string[] = [];

  // Only enforce for translation mode (when a langCode/lang_code is present)
  const newLang = newAssetValues?.langCode ?? "";

  if (newLang) {
    const domainId = newAssetValues?.domainId ?? null;

    const translations =
      oldAssetValues?.map((value: any) => value.translatedFields).flat() ?? [];

    const duplicate = translations.some((t: any) => {
      const tLang = t.langCode ?? t.lang_code ?? t.lang;
      const tDomain =
        t.domainId ??
        t.id ??
        t[`${assetType}_id`] ??
        oldAssetValues?.id ??
        null;
      return tLang === newLang && tDomain === domainId;
    });

    if (duplicate) {
      errors.push(
        `Duplicate translation detected for ${assetType} and language ${newLang}`
      );
    }
  }

  return errors;
}
