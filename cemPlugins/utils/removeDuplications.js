/**
 * @function
 * @template T
 * @param array {T[]}
 * @return {T[]}
 */
export function removeDuplications(array) {
  return [...new Set(array)];
}
