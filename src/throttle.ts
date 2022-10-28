/**
 * 节流
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export default function throttle(fn: FunctionType, interval = 200) {
  let last!: number;
  let timer!: NodeJS.Timeout;
  return function (this: FunctionType, ...args: unknown[]) {
    const now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}
