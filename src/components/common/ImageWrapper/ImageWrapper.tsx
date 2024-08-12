import { useRef, useState } from "react";
import "./imageWrapper.scss";
import ClipLoader from "../Loader/ClipLoader";
import { useSeen } from "../../../helpers/useSeen";
import { useSeenContext } from "../../../context/seenContext";

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
  const { seen } = useSeenContext();

  if (seen.has(src))
    return <SeenImage {...props} width={width} height={height} src={src} />;

  return <NotSeenImage {...props} width={width} height={height} src={src} />;
};

const SeenImage: React.FC<ImageWrapperProps> = ({
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
      <>
        {!isloaded && <ClipLoader />}
        <img
          style={{ display: isloaded ? "initial" : "none" }}
          onLoad={handleOnLoad}
          src={src}
          alt={src}
        />
      </>
    </div>
  );
};

export const NotSeenImage: React.FC<ImageWrapperProps> = ({
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
  const isSeen = useSeen(ref, src);

  return (
    <div
      {...props}
      ref={ref}
      style={{ width, height }}
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
