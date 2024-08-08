import { useState } from "react";
import "./imageWrapper.scss";

interface ImageWrapperProps
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

  return (
    <div
      {...props}
      style={{ width, height }}
      className={`image-wrapper ${props.className || ""}`}
    >
      {!isloaded && <div> Loading...</div>}
      <img onLoad={handleOnLoad} src={src} alt={src} />
    </div>
  );
};
