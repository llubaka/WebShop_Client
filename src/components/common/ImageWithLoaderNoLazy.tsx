import { useRef, useState } from "react";
import ClipLoader from "./Loader/ClipLoader";

interface ImageWithLoaderNoLazyProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
}

export const ImageWithLoaderNoLazy: React.FC<ImageWithLoaderNoLazyProps> = ({
  src,
  ...props
}) => {
  const [isloaded, setIsLoaded] = useState(false);
  const handleOnLoad = () => {
    setIsLoaded(() => true);
  };

  const ref = useRef<HTMLDivElement>(null);

  const style = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div ref={ref} style={!isloaded ? { ...style } : {}}>
      <>
        {!isloaded && <ClipLoader />}
        <img
          {...props}
          style={{ display: isloaded ? "initial" : "none" }}
          onLoad={handleOnLoad}
          src={src}
          alt={src}
        />
      </>
    </div>
  );
};
