import { useRef, useState } from "react";
import ClipLoader from "./Loader/ClipLoader";
import { useSeen } from "../../helpers/useSeen";

interface ImageWithLoaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  ...props
}) => {
  const [isloaded, setIsLoaded] = useState(false);
  const handleOnLoad = () => {
    setIsLoaded(() => true);
  };

  const ref = useRef<HTMLDivElement>(null);
  const isSeen = useSeen(ref);

  const style = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div ref={ref} style={!isloaded ? { ...style } : {}}>
      {isSeen && (
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
      )}
    </div>
  );
};
