/**
 * 函数防抖，用于在一系列连续调用中，仅执行最后一次调用。
 * @param func 需要防抖的函数。
 * @param delay 延迟的时间，默认为300毫秒。
 * @returns 返回一个新的函数，该函数会在停止连续调用后执行原函数。
 */
export function debounce(func: Function, delay: number = 300) {
  let status: number | null = null; // 用于存储定时器的标识符
  return function (...args: any[]) {
    if (status) clearTimeout(status); // 如果定时器已存在，则清除之前的定时器
    status = setTimeout(() => { // 设置新的定时器，延迟执行函数
      func.apply(this, args); // 执行传入的函数，并传递参数
      status = null; // 清空定时器标识符
    }, delay);
  };
}

/**
 * 函数节流，用于在一系列连续调用中，仅执行一定间隔的调用。
 * @param func 需要节流的函数。
 * @param delay 间隔的时间，默认为300毫秒。
 * @param sync 是否等待函数执行完毕后改变状态，默认为false。
 * @returns 返回一个新的函数，该函数会按照指定的间隔执行原函数。
 */
export function throttle(func: Function, delay: number = 300, sync = true) {
  let status: boolean = false;
  return function (...args: any[]) {
    if (status) return;
    status = true;
    if (sync) {
      func.apply(this, args);
    } else {
      setTimeout(() => {
        func.apply(this, args);
      }, 0);
    }
    setTimeout(() => {
      status = false;
    }, delay);
  };
}
