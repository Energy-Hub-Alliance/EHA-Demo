export const stringEnumToArray = (
  e: Record<string, string | number>
): string[] => {
  const enumStringValues = Object.values(e).filter(
    (v) => typeof v === 'string'
  ) as string[];

  if (enumStringValues.length === 0) {
    throw new Error('Enum contains no string values');
  }

  return enumStringValues;
};
