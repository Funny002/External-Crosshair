/**
 * 从数组中排除指定的元素
 * @param array 原始数组
 * @param omits 需要排除的元素数组
 * @returns 返回一个新的数组，其中不包含需要排除的元素
 */
export function arrayOmit<T extends any>(array: T[], omits: T[]) {
  return array.filter(item => !omits.includes(item));
}

/**
 * 从数组中挑选指定的元素
 * @param array 原始数组
 * @param picks 需要挑选的元素数组
 * @returns 返回一个新的数组，仅包含需要挑选的元素
 */
export function arrayPick<T extends any>(array: T[], picks: T[]) {
  return array.filter(item => picks.includes(item));
}

/**
 * 去除数组中的重复元素
 * @param array 原始数组
 * @returns 返回一个新的数组，其中不包含重复元素
 */
export function arrayUnique<T extends any>(array: T[]) {
  return Array.from(new Set(array));
}
