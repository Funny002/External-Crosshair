/**
 * 创建一个防抖函数，用于在一段时间内节制频繁操作。
 * @param fnc 要节制调用次数的函数。
 * @param delay 延迟的毫秒数，超过这个时间间隔后才会执行fnc。
 * @returns 返回一个新的函数，该函数在满足延迟条件时执行原函数。
 */
export function throttle(fnc: Function, delay: number) {
  let status = false;
  return function (this: any, ...args: any[]) {
    if (status) return;
    status = true;
    fnc.apply(this, args);
    setTimeout(() => {
      status = false;
    }, delay);
  };
}

/**
 * 创建一个节流函数，用于在一段时间内最多只执行一次传入的函数fnc。
 * @param fnc 要节制调用次数的函数。
 * @param delay 延迟的毫秒数，两次调用之间至少要间隔这个时间。
 * @returns 返回一个新的函数，该函数在满足间隔条件时执行原函数。
 */
export function debounce(fnc: Function, delay: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fnc.apply(this, args);
      timeout = null;
    }, delay);
  };
}

/**
 * 限制给定数值的范围，确保其不超过指定的最小值和最大值。
 * @param value 需要限制的原始数值。
 * @param min 允许的最小值。
 * @param max 允许的最大值。
 * @returns 返回限制后的数值，该值不会小于min且不会大于max。
 */
export function limitSize(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
