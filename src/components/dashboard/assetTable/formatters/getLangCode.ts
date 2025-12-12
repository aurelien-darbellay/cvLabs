export function getLangCode(translation: any): string {
  return (
    translation?.lang_code || translation?.langCode || translation?.lang || "—"
  );
}
