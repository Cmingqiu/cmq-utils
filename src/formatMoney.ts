/**
 * 金融数字格式化，用逗号分隔
 * @param {*} val
 * @returns string
 */
const formatMoney: (val: number | string) => string = (
  val: number | string
) => {
  const str = Number(val).toFixed(2);
  const reg =
    str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
  return str.replace(reg, '$1,');
};

export default formatMoney;
