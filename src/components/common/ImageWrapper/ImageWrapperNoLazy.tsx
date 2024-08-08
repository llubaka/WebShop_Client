import { useState } from "react";
import "./imageWrapper.scss";
import ClipLoader from "../Loader/ClipLoader";
import { ImageWrapperProps } from "./ImageWrapper";

export const ImageWrapperNoLazy: React.FC<ImageWrapperProps> = ({
  src,
  width,
  height,
  ...props
}) => {
  const [isloaded, setIsLoaded] = useState(false);
  const handleOnLoad = () => {
    setIsLoaded(() => true);
  };

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      {...props}
      style={!isloaded ? { ...style, width, height } : { width, height }}
      className={`image-wrapper ${props.className || ""}`}
    >
      {!isloaded && <ClipLoader />}
      <img
        style={{ display: isloaded ? "initial" : "none" }}
        onLoad={handleOnLoad}
        src={src}
        alt={src}
      />
    </div>
  );
};
