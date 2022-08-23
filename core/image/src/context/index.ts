export const store = {
  canvasCtx: undefined,
  mousePosition: {
    x: undefined,
    y: undefined,
  },
  // 偏移量
  offset: { x: 0, y: 0 },
  currentOffset: { x: 0, y: 0 },
};

/**
 * 存储器装饰器
 * @param key store 内的 key
 * @returns
 */
export function storeValue(
  key: "canvasCtx" | "mousePosition" | "offset" | "currentOffset"
): any {
  return function () {
    return {
      get() {
        return store[key];
      },

      set(val) {
        return (store[key] = val);
      },
    };
  };
}
