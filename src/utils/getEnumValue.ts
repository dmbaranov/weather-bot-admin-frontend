export function getEnumValue<T extends Record<string, string | number>>(enumObject: T, key: string): T[keyof T] {
  if (key in enumObject) {
    return enumObject[key as keyof T];
  }

  throw new Error(`Unknown property ${String(key)} in ${JSON.stringify(enumObject)}`);
}
