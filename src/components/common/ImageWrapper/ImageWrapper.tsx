import "./imageWrapper.scss";

type ImageWrapperProps = {
  src: string;
  width: string;
  height: string;
};
export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  width,
  height,
}) => {
  return (
    <div style={{ width, height }} className="image-wrapper">
      <img className="image-wrapper__image" src={src} alt={src} />
    </div>
  );
};
