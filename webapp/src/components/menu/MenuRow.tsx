import { Link } from "react-router-dom";

interface MenuRowProps {
  title: string;
  linkTo: string;
  iconUrl: string;
  onClick: () => void;
}

export const MenuRow: React.FC<MenuRowProps> = ({
  title,
  linkTo,
  iconUrl,
  onClick,
}) => {
  const getMenuIconUrl = (iconUrl: string) => {
    return `/menu/${iconUrl}`;
  };
  return (
    <div className="menu-row">
      {iconUrl && <img src={getMenuIconUrl(iconUrl)} alt={iconUrl} />}
      <Link key={title} to={linkTo} onClick={onClick}>
        {title}
      </Link>
    </div>
  );
};
