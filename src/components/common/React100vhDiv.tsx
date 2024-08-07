import React, { forwardRef, useState, useEffect, HTMLAttributes } from "react";

export const React100vhDiv = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ style, ...other }, ref) => {
  let height = use100vh();

  const styleWithRealHeight = {
    ...style,
    height: height ? `${height - 90}px` : "calc(100vh - 90px)",
  };
  return <div ref={ref} style={styleWithRealHeight} {...other} />;
});

export function use100vh(): number | null {
  const [height, setHeight] = useState<number | null>(measureHeight);

  const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce();

  useEffect(() => {
    if (!wasRenderedOnClientAtLeastOnce) return;

    function setMeasuredHeight() {
      const measuredHeight = measureHeight();
      setHeight(measuredHeight);
    }

    window.addEventListener("resize", setMeasuredHeight);
    return () => window.removeEventListener("resize", setMeasuredHeight);
  }, [wasRenderedOnClientAtLeastOnce]);
  return wasRenderedOnClientAtLeastOnce ? height : null;
}

export function measureHeight(): number | null {
  if (!isClient()) return null;
  return window.innerHeight;
}

// Once we ended up on the client, the first render must look the same as on
// the server so hydration happens without problems. _Then_ we immediately
// schedule a subsequent update and return the height measured on the client.
// It's not needed for CSR-only apps, but is critical for SSR.
function useWasRenderedOnClientAtLeastOnce() {
  const [wasRenderedOnClientAtLeastOnce, setWasRenderedOnClientAtLeastOnce] =
    useState(false);

  useEffect(() => {
    if (isClient()) {
      setWasRenderedOnClientAtLeastOnce(true);
    }
  }, []);
  return wasRenderedOnClientAtLeastOnce;
}

function isClient() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
