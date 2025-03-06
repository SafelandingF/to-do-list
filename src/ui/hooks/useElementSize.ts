import { RefObject, useEffect, useState } from 'react';

interface ComponentSize {
  width: number;
  height: number;
}

const useGetComponentSize = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [size, setSize] = useState<ComponentSize>({
    width: 1000,
    height: 1000
  });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
};

export default useGetComponentSize;
