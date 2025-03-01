import { useState, useCallback, useEffect } from "react";

import { createStorage } from "@/utils/storage";

export function useStorage<T>(key: string, initialValue?: T) {
  const storage = createStorage<T>(key, initialValue);
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
