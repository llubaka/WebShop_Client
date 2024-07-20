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
      {iconUrl && <img src={getMenuIconUrl(iconUrl)} alt={iconUrl} />}
      <div>{title}</div>
    </Link>
  );
};
