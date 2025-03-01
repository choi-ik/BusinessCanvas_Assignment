export interface UseArrayStorageReturn<T> {
  value: T[];
  setValue: React.Dispatch<React.SetStateAction<T[]>>;
  add: (item: T) => void;
  remove: (predicate: (item: T) => boolean) => void;
  updateItem: (predicate: (item: T) => boolean, updater: (item: T) => T) => void;
}

export interface UseStorageReturn<T> {
  value: T | null;
  setValue: (newValue: T) => void;
  updateValue: (updater: (current: T | null) => T) => T;
}
