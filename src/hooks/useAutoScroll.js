import { useEffect, useRef } from "react";

let previousLength = 0; 

export const useAutoScroll = (items) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    const currentLength = items?.length || 0;


    if (currentLength > previousLength) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100); 
    }
    

    previousLength = currentLength;
  }, [items?.length]);

  return bottomRef;
};