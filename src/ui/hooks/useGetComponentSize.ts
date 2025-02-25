import { RefObject, useEffect, useState } from 'react';

interface ComponentSize {
  width: number;
  height: number;
}

const useGetComponentSize = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [size, setSize] = useState<ComponentSize>();
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      console.log(entries);
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return size;
};

export default useGetComponentSize;
