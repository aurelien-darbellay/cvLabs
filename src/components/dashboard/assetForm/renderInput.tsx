import type { AssetFieldConfig, FieldInputType } from "@/types/assets";

interface RenderInputArgs {
  field: AssetFieldConfig;
  value: any;
  onChange: (val: any) => void;
}

export function renderInput({ field, value, onChange }: RenderInputArgs) {
  const commonProps = {
    id: field.key,
    name: field.key,
    className:
      "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500",
    value: value ?? "",
    onChange: (e: any) => onChange(e.target.value),
  };

  switch (field.type as FieldInputType) {
    case "textarea":
      return <textarea {...commonProps} rows={4} />;
    case "number":
      return <input type="number" {...commonProps} />;
    case "date":
      return (
        <input
          type="date"
          {...commonProps}
          value={
            value instanceof Date
              ? value.toISOString().slice(0, 10)
              : typeof value === "string"
              ? value
              : ""
          }
        />
      );
    case "boolean":
      return (
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          {field.label}
        </label>
      );
    case "tags":
      return (
        <input
          type="text"
          {...commonProps}
          placeholder="Comma-separated"
          value={Array.isArray(value) ? value.join(", ") : value ?? []}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean)
            )
          }
        />
      );
    case "select":
      return (
        <select
          {...commonProps}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">{field.placeholder || "Select an option"}</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    default:
      return <input type="text" {...commonProps} />;
  }
}
