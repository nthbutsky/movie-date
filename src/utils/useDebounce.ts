import { useCallback, useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  return useCallback((...args: Parameters<T>) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }, [fn, delay]);
};