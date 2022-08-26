interface IStore {
  mousePosition: {
    x: number;
    y: number;
  };
  // 偏移量
  offset: { x: number; y: number };
  currentOffset: { x: number; y: number };
}

export const store: IStore = {
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
export function contextValue(key: keyof IStore): any {
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
