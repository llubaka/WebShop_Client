import { useRef, useState } from "react";
import ClipLoader from "./Loader/ClipLoader";
import { useSeen } from "../../helpers/useSeen";
import { useSeenContext } from "../../context/seenContext";

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
  const { seen } = useSeenContext();

  if (seen.has(src)) return <SeenImage {...props} src={src} />;

  return <NotSeenImage {...props} src={src} />;
};

const SeenImage: React.FC<ImageWithLoaderProps> = ({ src, ...props }) => {
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

const NotSeenImage: React.FC<ImageWithLoaderProps> = ({ src, ...props }) => {
  const [isloaded, setIsLoaded] = useState(false);
  const handleOnLoad = () => {
    setIsLoaded(() => true);
  };

  const ref = useRef<HTMLDivElement>(null);
  const isSeen = useSeen(ref, src);

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
