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
  return (
    <div
      {...props}
      style={{ width, height }}
      className={`image-wrapper ${props.className || ""}`}
    >
      <img className="image-wrapper__image" src={src} alt={src} />
    </div>
  );
};
