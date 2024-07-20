import { Link } from "react-router-dom";

interface LinkMenuRowProps {
  title: string;
  linkTo: string;
  iconUrl?: string;
  onClick?: () => void;
}

export const LinkMenuRow: React.FC<LinkMenuRowProps> = ({
  title,
  linkTo,
  iconUrl,
  onClick,
}) => {
  const getMenuIconUrl = (iconUrl: string) => {
    return `/menu/${iconUrl}`;
  };
  return (
    <Link key={title} to={linkTo} onClick={onClick} className="menu-row">
      {iconUrl && (
        <div className="menu-row-img-container">
          <img
            className="menu-row-img-container__image"
            src={getMenuIconUrl(iconUrl)}
            alt={iconUrl}
          />
        </div>
      )}
      <div>{title}</div>
    </Link>
  );
};
