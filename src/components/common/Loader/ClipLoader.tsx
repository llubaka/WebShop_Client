import * as React from "react";

import { cssValue } from "./unitConverter";
import { CSSProperties } from "styled-components";

const createAnimation = (
  loaderName: string,
  frames: string,
  suffix: string
): string => {
  const animationName = `react-spinners-${loaderName}-${suffix}`;

  if (typeof window == "undefined" || !window.document) {
    return animationName;
  }

  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;

  const keyFrames = `
      @keyframes ${animationName} {
        ${frames}
      }
    `;

  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }

  return animationName;
};

const clip = createAnimation(
  "ClipLoader",
  "0% {transform: rotate(0deg) scale(1)} 50% {transform: rotate(180deg) scale(0.8)} 100% {transform: rotate(360deg) scale(1)}",
  "clip"
);

interface LoaderSizeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
  size?: number | string;
}

function ClipLoader({
  loading = true,
  color = "gold",
  speedMultiplier = 1,
  cssOverride = {},
  size = 35,
  ...additionalprops
}: LoaderSizeProps): JSX.Element | null {
  const style: React.CSSProperties = {
    background: "transparent !important",
    width: cssValue(size),
    height: cssValue(size),
    borderRadius: "100%",
    border: "2px solid",
    borderTopColor: color,
    borderBottomColor: "transparent",
    borderLeftColor: color,
    borderRightColor: color,
    display: "inline-block",
    animation: `${clip} ${0.75 / speedMultiplier}s 0s infinite linear`,
    animationFillMode: "both",
    ...cssOverride,
  };

  if (!loading) {
    return null;
  }

  return <span style={style} {...additionalprops} />;
}

export default ClipLoader;
