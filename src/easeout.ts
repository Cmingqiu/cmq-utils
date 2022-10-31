/**
 * 缓冲函数
 * @param {Number} position 当前滚动位置
 * @param {Number} destination 目标位置
 * @param {Number} rate 缓动率
 * @param {Function} callback 缓动结束回调函数 两个参数分别是当前位置和是否结束
 */
export default function easeout(
  position: number,
  destination = 0,
  rate = 2,
  callback: (pos: number, flg: boolean) => void
) {
  if (position === destination) return false;
  // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (fn) {
      return setTimeout(fn, 17);
    };
  }
  const step = function () {
    position = position + (destination - position) / rate;
    if (Math.abs(destination - position) < 1) {
      callback(destination, true);
      return;
    }
    callback(position, false);
    requestAnimationFrame(step);
  };
  step();
}
