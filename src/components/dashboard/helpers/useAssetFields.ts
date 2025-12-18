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
    base?.map((field) => {
      if (field.key === "langCode") {
        return {
          ...field,
          options: languages.map((lang) => ({
            value: lang.code,
            label: lang.name || lang.code,
          })),
        };
      } else if (field.key === "levelCode") {
        return {
          ...field,
          options: [
            { value: "A1", label: "A1 - Beginner" },
            { value: "A2", label: "A2 - Elementary" },
            { value: "B1", label: "B1 - Intermediate" },
            { value: "B2", label: "B2 - Upper Intermediate" },
            { value: "C1", label: "C1 - Advanced" },
            { value: "C2", label: "C2 - Proficient" },
            { value: "Native", label: "Native Speaker" },
          ],
        };
      }
      return field;
    }) ?? []
  );
}
