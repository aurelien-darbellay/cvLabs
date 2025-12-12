import { assetFormSchema } from "@/types/assetFormSchema";
import type {
  AssetEditMode,
  AssetFieldConfig,
  AssetType,
} from "@/types/assets";
import { useLinguisticContext } from "@/contexts/LinguisticContext";

export function useAssetFields(
  assetType: AssetType,
  mode: AssetEditMode
): AssetFieldConfig[] {
  const { languages } = useLinguisticContext();
  const schema = assetFormSchema[assetType];
  const base =
    mode === "translation" ? schema.translationFields : schema.baseFields;

  return (
    base?.map((field) =>
      field.key === "langCode"
        ? {
            ...field,
            options: languages.map((lang) => ({
              value: lang.code,
              label: lang.name || lang.code,
            })),
          }
        : field
    ) ?? []
  );
}
