/**
 * 获取给定值的类型
 * @param value 任意类型的值
 * @param locale 是否将类型名称转换为小写，可选，默认为 false
 * @returns 返回值的类型字符串
 */
export function getType(value: any, locale: boolean | 'upper' | 'lower' = false): string {
  const type = Object.prototype.toString.call(value).slice(8, -1);
  if ([true, 'lower'].includes(locale)) {
    return type.toLowerCase();
  }
  return type;
}

/**
 * 检查给定值是否为指定的类型之一
 * @param value 任意类型的值
 * @param types 一个或多个要检查的类型字符串
 * @returns 如果给定值的类型与任一指定类型匹配，则返回 true，否则返回 false
 */
export function isTypes(value: any, ...types: string[]): boolean {
  return types.map(v => v.toLowerCase()).includes(getType(value, true));
}

/**
 * 深度合并多个对象
 * @param arg 初始目标对象，扩展时将被覆盖
 * @param args 一个或多个源对象，用于合并到目标对象中
 * @returns 返回合并后的目标对象
 */
export function objectMerge<T extends any>(arg: T & Record<string, any>, ...args: Record<string, any>[]): T {
  const target = objectDeepCopy(arg);
  for (const item of args) {
    if (!isObject(item)) continue;
    for (const keys of Object.keys(item)) {
      if (isObject(item[keys])) {
        if (isObject(target[keys])) {
          target[keys] = objectMerge(target[keys], item[keys]);
        } else {
          target[keys] = objectDeepCopy(item[keys]);
        }
      } else if (isArray(item[keys])) {
        target[keys] = [...item[keys]];
      } else {
        target[keys] = item[keys];
      }
    }
  }
  return target;
}

/**
 * 从对象中排除指定的键
 * @param target 源对象
 * @param omits 要排除的键的数组
 * @returns 返回一个新的对象，其中不包含被排除的键
 */
export function objectOmit(target: Record<string, any>, omits: string[]) {
  return Object.keys(target).reduce(function (prev: Record<string, any>, keys) {
    if (!omits.includes(keys)) {
      prev[keys] = target[keys];
    }
    return prev;
  }, {});
}

/**
 * 从对象中仅选择指定的键
 * @param target 源对象
 * @param picks 要选择的键的数组
 * @returns 返回一个新的对象，仅包含被选择的键
 */
export function objectPick(target: Record<string, any>, picks: string[]) {
  return picks.reduce(function (prev: Record<string, any>, keys) {
    if (target.hasOwnProperty(keys)) {
      prev[keys] = target[keys];
    }
    return prev;
  }, {});
}

/**
 * 检查值是否为数组
 * @param value 任意类型的值
 * @returns 如果值是数组，则返回 true，否则返回 false
 */
export const isArray = (value: any): value is any[] => Array.isArray(value);

/**
 * 深度复制对象
 * @param target 要复制的目标对象
 * @returns 返回复制后的新对象
 */
export const objectDeepCopy = (target: any) => JSON.parse(JSON.stringify(target));

/**
 * 检查值是否为 null
 * @param value 任意类型的值
 * @returns 如果值是 null，则返回 true，否则返回 false
 */
export const isNull = (value: any): value is null => isTypes(value, 'null');

/**
 * 检查值是否为 Infinity 或 -Infinity
 * @param value 任意类型的值
 * @returns 如果值是 Infinity 或 -Infinity，则返回 true，否则返回 false
 */
export const isInfinity = (value: any) => value === Infinity || value === -Infinity;

/**
 * 检查值是否为字符串
 * @param value 任意类型的值
 * @returns 如果值是字符串，则返回 true，否则返回 false
 */
export const isString = (value: any): value is string => isTypes(value, 'string');

/**
 * 检查值是否为布尔值
 * @param value 任意类型的值
 * @returns 如果值是布尔值，则返回 true，否则返回 false
 */
export const isBoolean = (value: any): value is boolean => isTypes(value, 'boolean');

/**
 * 检查值是否为函数
 * @param value 任意类型的值
 * @returns 如果值是函数，则返回 true，否则返回 false
 */
export const isFunction = (value: any): value is Function => isTypes(value, 'function');

/**
 * 检查值是否为 undefined
 * @param value 任意类型的值
 * @returns 如果值是 undefined，则返回 true，否则返回 false
 */
export const isUndefined = (value: any): value is undefined => isTypes(value, 'undefined');

/**
 * 检查值是否为 Promise 对象
 * @param value 任意类型的值
 * @returns 如果值是 Promise 对象，则返回 true，否则返回 false
 */
export const isPromise = (value: any): value is Promise<any> => isTypes(value, 'promise');

/**
 * 检查值是否为对象
 * @param value 任意类型的值
 * @returns 如果值是对象，则返回 true，否则返回 false
 */
export const isObject = (value: any): value is Record<string, any> => isTypes(value, 'object');

/**
 * 检查值是否为数字，排除 NaN 和 Infinity
 * @param value 任意类型的值
 * @returns 如果值是有效的数字，则返回 true，否则返回 false
 */
export const isNumber = (value: any): value is number => {
  if (isNaN(value) || isInfinity(value)) return false;
  return isTypes(value, 'number');
};

/**
 * 检查值是否为空，包括空字符串、0、false、null、undefined 以及空对象和空数组
 * @param value 任意类型的值
 * @returns 如果值被认为是空的，则返回 true，否则返回 false
 */
export function isEmpty(value: any): boolean {
  if (value === '' || value === 0 || value === false || value === null || value === undefined) return true;
  if (isObject(value)) return Object.keys(value).length === 0;
  if (isArray(value)) return value.length === 0;
  return false;
}

/**
 * 检查给定的字符串是否为有效的URL格式
 * @param url 要检查的字符串
 * @returns 如果字符串是有效的URL格式，则返回true；否则返回false
 */
export function isUrl(url: string) {
  return /^(http|https):\/\//.test(url);
}
