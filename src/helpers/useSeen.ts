import { RefObject, useEffect, useMemo, useState } from "react";
import { useSeenContext } from "../context/seenContext";

export const useSeen = (ref: RefObject<HTMLElement>, imgSrc: string) => {
  const [isSeen, setIsSeen] = useState(false);
  const { setSeen: setSeenContext } = useSeenContext();

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!isSeen) {
            setIsSeen(true);
            setSeenContext(imgSrc);
          }
        }
      }),
    [imgSrc, isSeen, setSeenContext]
  );

  useEffect(() => {
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer, ref]);

  return isSeen;
};
