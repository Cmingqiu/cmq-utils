/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export default function debounce(fn: FunctionType, delay = 200) {
  let timer: NodeJS.Timeout | null;
  return function (this: FunctionType, ...args: unknown[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
}
