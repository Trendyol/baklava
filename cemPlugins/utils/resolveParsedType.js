/**
 * @param parsedType {string}
 * @param replace
 * @returns {string | null}
 */
export function resolveParsedType(parsedType, replace = "@trendyol/baklava/dist/") {
  if (!parsedType) return null;
  return parsedType.replaceAll("<rootPath>/", replace);
}
