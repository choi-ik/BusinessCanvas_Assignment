import { createStorage } from "./storage";

/** storage.ts의 배열 연산 확장 전용 헬퍼  */
export function createArrayStorage<T>(key: string, initialValue: T[] = []) {
  const storage = createStorage<T[]>(key, initialValue);

  return {
    ...storage,
    add: (item: T) => storage.updateValue((arr) => (arr ? [...arr, item] : [item])),
    delete: (predicate: (item: T) => boolean) =>
      storage.updateValue((arr) => (arr ? arr.filter((item) => !predicate(item)) : [])),
    updateItem: (predicate: (item: T) => boolean, updater: (item: T) => T) =>
      storage.updateValue((arr) =>
        arr ? arr.map((item) => (predicate(item) ? updater(item) : item)) : [],
      ),
  };
}
