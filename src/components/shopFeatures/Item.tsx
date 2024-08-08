import { ImageWrapper } from "../common/ImageWrapper/ImageWrapper";
import "./item.scss";

interface ItemInterface {
  title: string;
  info: string;
  imageUrl: string;
}

export const Item: React.FC<ItemInterface> = ({ title, info, imageUrl }) => {
  return (
    <div className="footer-item">
      <ImageWrapper
        src={imageUrl}
        width="80px"
        height="80px"
        className="footer-item__image"
      />
      <div className="footer-item__title">{title}</div>
      <div className="footer-item__info">{info}</div>
    </div>
  );
};
