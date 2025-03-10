import { useCallback, useEffect, useMemo, useState } from "react";

import { createArrayStorage } from "@/utils/arrayStorage";

/** arrayStorage.ts를 래핑하여 상태관리를 지원하는 훅 */
export function useArrayStorage<T>(key: string, initialValue: T[] = []) {
  const storage = useMemo(() => createArrayStorage<T>(key, initialValue), [key]);
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

  return { value, setValue, add, remove, updateItem, storage };
}
