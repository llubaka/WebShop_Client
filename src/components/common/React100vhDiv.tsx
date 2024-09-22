import React, { forwardRef, useState, useEffect, HTMLAttributes } from "react";

interface React100vhDivInterface extends HTMLAttributes<HTMLDivElement> {
  heightOffset?: number;
}

export const React100vhDiv = forwardRef<HTMLDivElement, React100vhDivInterface>(
  ({ heightOffset, style, ...other }, ref) => {
    let height = use100vh();

    const styleWithRealHeight = heightOffset
      ? {
          ...style,
          height: height
            ? `${height - heightOffset}px`
            : `calc(100vh - ${heightOffset}px)`,
        }
      : {
          ...style,
          height: height ? `${height}px` : "100vh",
        };
    return <div ref={ref} style={styleWithRealHeight} {...other} />;
  }
);

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
