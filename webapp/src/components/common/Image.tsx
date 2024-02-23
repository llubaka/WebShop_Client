// Directly targeting the public/images folder to remove redundant code and add alt text as the image text.

interface IImage extends React.ButtonHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const Image: React.FC<IImage> = ({ src, ...props }) => {
  const source = `/images/${src}`;
  const altAtr = src.split(".")[0];

  return (
    <div {...props}>
      <img src={source} alt={altAtr} />
    </div>
  );
};
