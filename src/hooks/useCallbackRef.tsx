import * as React from "react";

/** 최신 콜백 함수를 안정적으로 참조하는 함수 반환하는 훅(+ 불필요한 재렌더링 방지) */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined,
): T {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}
