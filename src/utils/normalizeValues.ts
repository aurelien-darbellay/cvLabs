function toSnakeCase(key: string): string {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * Normalizes empty string values to null for database compatibility.
 * PostgreSQL doesn't accept empty strings for date, number, or other typed columns.
 */
function normalizeEmptyValues(value: any): any {
  // Convert empty strings to null
  if (value === "") {
    return null;
  }

  // Recursively handle arrays
  if (Array.isArray(value)) {
    return value.length === 0 ? null : value;
  }

  // Recursively handle objects
  if (value && typeof value === "object") {
    return Object.entries(value).reduce<Record<string, any>>((acc, [k, v]) => {
      acc[k] = normalizeEmptyValues(v);
      return acc;
    }, {});
  }

  return value;
}

export default function normalizeValues(
  values: Record<string, any>
): Record<string, any> {
  return Object.entries(values || {}).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      const snakeKey = toSnakeCase(key);
      acc[snakeKey] = normalizeEmptyValues(value);
      return acc;
    },
    {}
  );
}
