import { useCallback, useEffect, useState } from "react";

import { createArrayStorage } from "@/utils/arrayStorage";

export function useArrayStorage<T>(key: string, initialValue: T[] = []) {
  const storage = createArrayStorage<T>(key, initialValue);
  const [value, setValue] = useState<T[] | null>(storage.getValue());

  useEffect(() => {
    if (storage.getValue() === null) {
      storage.setValue(initialValue);
      setValue(storage.getValue());
    }
  }, [storage, initialValue]);

  const add = useCallback(
    (item: T) => {
      const newArr = storage.add(item);
      setValue(newArr);
    },
    [storage],
  );

  const remove = useCallback(
    (predicate: (item: T) => boolean) => {
      const newArr = storage.delete(predicate);
      setValue(newArr);
    },
    [storage],
  );

  const updateItem = useCallback(
    (predicate: (item: T) => boolean, updater: (item: T) => T) => {
      const newArr = storage.updateItem(predicate, updater);
      setValue(newArr);
    },
    [storage],
  );

  return { value, setValue, add, remove, updateItem };
}
