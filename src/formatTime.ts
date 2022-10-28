/**
 * 日期时间格式化
 * @param {*} val
 * @param {*} fmt
 * @returns
 */
export default function dateFtt(
  val: string | number | Date,
  fmt = 'yyyy-MM-dd'
) {
  if (val === '' || val === undefined || val === null) return val;
  const date: Date = new Date(val);
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  let k!: keyof typeof o;
  for (k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? '' + o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}
