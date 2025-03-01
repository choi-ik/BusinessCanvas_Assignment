type StorageMode = "local-storage" | "in-memory";

const STORAGE_MODE: StorageMode = import.meta.env.VITE_STORAGE || "in-memory";

/** in-memory/local-storage 환경 변수 설정에 따른 데이터 핸들러 유틸 함수 */
export function createStorage<T>(key: string, initialValue?: T) {
  const serialize = (value: T): string => JSON.stringify(value);

  const deserialize = (value: string): T => {
    try {
      return JSON.parse(value) as T;
    } catch {
      return initialValue as T;
    }
  };

  const localStorageSave = (value: T): void => {
    window.localStorage.setItem(key, serialize(value));
  };

  const localStorageLoad = (): T | null => {
    const data = window.localStorage.getItem(key);

    return data ? deserialize(data) : null;
  };

  let inMemoryValue: T | null = initialValue ?? null;

  const setValue = (value: T): T => {
    if (STORAGE_MODE === "local-storage") {
      localStorageSave(value);
    } else {
      inMemoryValue = value;
    }

    return value;
  };

  const getValue = (): T | null => {
    if (STORAGE_MODE === "local-storage") {
      return localStorageLoad();
    }

    return inMemoryValue;
  };

  const updateValue = (updater: (current: T | null) => T): T => {
    const current = getValue();
    const newValue = updater(current);
    setValue(newValue);

    return newValue;
  };

  return {
    setValue,
    getValue,
    updateValue,
  };
}
