import { useState, useCallback, useEffect, useMemo } from "react";

import { createStorage } from "@/utils/storage";

/** storage.ts를 래핑하여 상태관리를 지원하는 훅 */
export function useStorage<T>(key: string, initialValue?: T) {
  const storage = useMemo(() => createStorage<T>(key, initialValue), [key]);
  const [value, setValue] = useState<T | null>(storage.getValue());

  useEffect(() => {
    if (storage.getValue() === null && initialValue !== undefined) {
      storage.setValue(initialValue);
      setValue(storage.getValue());
    }
  }, [storage, initialValue]);

  const updateValue = useCallback(
    (updater: (current: T | null) => T) => {
      const newValue = storage.updateValue(updater);
      setValue(newValue);

      return newValue;
    },
    [storage],
  );

  const setStorageValue = useCallback(
    (newValue: T) => {
      storage.setValue(newValue);
      setValue(newValue);
    },
    [storage],
  );

  return { value, setValue: setStorageValue, updateValue };
}
