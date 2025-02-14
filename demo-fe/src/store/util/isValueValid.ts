export function isValueValid(
  value: string | boolean | number | null | undefined
) {
  // empty string, null or undefined should not be valid, 0 should be valid
  const EmptyString = typeof value === 'string' && value === '';
  const ValueExist =
    typeof value !== 'object' && typeof value !== 'undefined' && !EmptyString;
  return ValueExist;
}
