import { useState, useEffect, useRef, RefObject } from 'react';

export function useOnScreen<T extends Element>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null as unknown as T);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}
