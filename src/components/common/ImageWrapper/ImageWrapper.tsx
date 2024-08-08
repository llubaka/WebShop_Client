import { useRef, useState } from "react";
import "./imageWrapper.scss";
import ClipLoader from "../Loader/ClipLoader";
import { useSeen } from "../../../helpers/useSeen";

export interface ImageWrapperProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  src: string;
  width: string;
  height: string;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  width,
  height,
  ...props
}) => {
  const [isloaded, setIsLoaded] = useState(false);
  const handleOnLoad = () => {
    setIsLoaded(() => true);
  };

  const ref = useRef<HTMLDivElement>(null);
  const isSeen = useSeen(ref);

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      {...props}
      ref={ref}
      style={!isloaded ? { ...style, width, height } : { width, height }}
      className={`image-wrapper ${props.className || ""}`}
    >
      {isSeen && (
        <>
          {!isloaded && <ClipLoader />}
          <img
            style={{ display: isloaded ? "initial" : "none" }}
            onLoad={handleOnLoad}
            src={src}
            alt={src}
          />
        </>
      )}
    </div>
  );
};
