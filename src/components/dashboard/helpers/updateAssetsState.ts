export function updateAssetsState(
  currentAssets: any[],
  saved: any,
  data: {
    mode: "base" | "translation";
    asset: any;
    values: Record<string, any>;
  }
): any[] {
  if (data.mode === "base") {
    if (data.asset?.id == null) {
      return [...currentAssets, saved];
    }
    return currentAssets.map((item) =>
      item.id === data.asset?.id ? { ...item, ...saved } : item
    );
  }

  const langCode = data.values.langCode ?? saved?.lang_code;

  return currentAssets.map((item) => {
    if (item.id !== data.asset?.id) return item;
    const translations = item.translatedFields ?? [];

    const idx = translations.findIndex((t: any) => t.langCode === langCode);

    const nextTranslations =
      idx >= 0
        ? translations.map((t: any, i: number) =>
            i === idx ? { ...t, ...data.values } : t
          )
        : [...translations, data.values];

    if (item.translatedFields) {
      return { ...item, translatedFields: nextTranslations };
    }
    return { ...item, translatedFields: nextTranslations };
  });
}
