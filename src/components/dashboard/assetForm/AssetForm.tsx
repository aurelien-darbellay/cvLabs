import { useMemo, useState } from "react";
import type { AssetFieldConfig } from "@/types/assets";
import { renderInput } from "./renderInput";

interface AssetFormProps {
  fields: AssetFieldConfig[];
  values: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void;
}

export function AssetForm({ fields, values, onSubmit }: AssetFormProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    fields.forEach((field) => {
      initial[field.key] = values?.[field.key] ?? "";
    });
    return initial;
  });
  const requiredFields = useMemo(
    () => fields.filter((f) => !f.optional),
    [fields]
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.key} className="space-y-1">
          {field.type !== "boolean" && (
            <label
              htmlFor={field.key}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
              {!field.optional && (
                <span className="text-red-500 ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}
          {renderInput({
            field,
            value: formValues[field.key],
            onChange: (val) =>
              setFormValues((prev) => ({ ...prev, [field.key]: val })),
          })}
        </div>
      ))}

      <div className="text-xs text-gray-500">
        Fields marked with * are required (
        {requiredFields.map((f) => f.label).join(", ")}).
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold"
        >
          Save
        </button>
      </div>
    </form>
  );
}
