/**
 * 数组和对象深拷贝
 * @returns
 */

function deepClone(obj: Record<string, unknown>, hash = new WeakMap()) {
  const typeOf = (obj: unknown): string | undefined =>
    Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)?.[0];

  // WeakMap是弱引用，不要用Map
  // null 和 undefiend 是不需要拷贝的
  if (obj === null) return obj;
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (typeof obj != 'object') return obj; // 函数是不需要拷贝
  // 说明是一个对象类型
  if (hash.get(obj)) return hash.get(obj);
  const cloneObj = new (obj.constructor as { new (): typeof obj })(); // []  {}
  hash.set(obj, cloneObj);

  let key: keyof typeof obj;
  for (key in obj) {
    // in 会遍历当前对象上的属性和__proto__ 上的属性
    // 不拷贝 对象的__proto__ 上的属性
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      typeOf(obj[key]) === 'Object'
    ) {
      // 如果值还有可能是对象，就继续拷贝
      cloneObj[key] = deepClone(obj[key] as Record<string, unknown>, hash);
    }
    // 区分对象和数组 Object.prototype.toString.call
  }
  return cloneObj;
}

export default deepClone;
