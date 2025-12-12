export function getTranslationsFromAsset(asset: any): any[] {
  if (Array.isArray(asset?.translatedFields)) {
    return asset.translatedFields;
  }
  if (Array.isArray(asset?.translations)) {
    return asset.translations;
  }
  return [];
}
