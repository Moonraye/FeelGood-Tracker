import { useEffect, useRef } from "react";

/**
 * @param items
 */
export const useAutoScroll = <T>(items: T[]) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const previousLengthRef = useRef<number>(items?.length || 0);

  useEffect(() => {
    const currentLength = items?.length || 0;

    if (currentLength > previousLengthRef.current) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100); 
    }
        previousLengthRef.current = currentLength;
  }, [items?.length]);

  return bottomRef;
};