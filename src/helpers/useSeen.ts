import { RefObject, useEffect, useMemo, useState } from "react";

export const useSeen = (ref: RefObject<HTMLElement>) => {
  const [isSeen, setIsSeen] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setIsSeen(true);
      }),
    []
  );

  useEffect(() => {
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer, ref]);

  return isSeen;
};
