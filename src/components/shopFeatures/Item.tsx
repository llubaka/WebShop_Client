import "./item.scss";

interface ItemInterface {
  title: string;
  info: string;
  imageUrl: string;
}

export const Item: React.FC<ItemInterface> = ({ title, info, imageUrl }) => {
  const source = `/images/${imageUrl}`;
  return (
    <div className="footer-item">
      <img src={source} alt={imageUrl} />
      <div className="footer-item__title">{title}</div>
      <div className="footer-item__info">{info}</div>
    </div>
  );
};
