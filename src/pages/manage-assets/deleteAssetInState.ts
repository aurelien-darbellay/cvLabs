import {
  getLangCode,
  getTranslationsFromAsset,
} from "@/components/dashboard/assetTable/formatters";

export default function deleteAssetInState(
  currentAssets: any[],
  data: { mode: "base" | "translation"; asset: any; translation?: any }
): any[] {
  if (data.mode === "base") {
    return currentAssets.filter((item) => item.id !== data.asset?.id);
  }
  const langCode = (data.translation && getLangCode(data.translation)) || "";
  return currentAssets.map((item) => {
    if (item.id !== data.translation?.domainId && item.id !== data.asset?.id)
      return item;
    const remainingTranslations = getTranslationsFromAsset(item).filter(
      (t: any) => getLangCode(t) !== langCode
    );
    if (item.translatedFields) {
      return { ...item, translatedFields: remainingTranslations };
    }
    if (item.translations) {
      return { ...item, translations: remainingTranslations };
    }
    return item;
  });
}
