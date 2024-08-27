/**
 * 生成指定范围内的随机整数
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 * @returns 在指定范围内的随机整数
 */
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 随机生成一个字符
 * @returns 随机字符
 */
export function randomChar(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

/**
 * 随机生成指定长度的字符串
 * @param long 字符串长度
 * @returns 随机字符串
 */
export function randomStr(long: number): string {
  return Array.from(new Array(long), () => randomChar()).join('');
}

/**
 * 根据指定格式生成随机UUID
 * @param format UUID格式，默认为'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 * @returns 随机UUID
 */
export function randomUUIDByFormat(format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
  return format.replace(/[xy]/g, v => {
    return v === 'x' ? randomChar() : randomInt(0, 9).toString();
  });
}
