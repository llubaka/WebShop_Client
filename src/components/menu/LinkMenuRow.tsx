import { Link } from "react-router-dom";
import { ImageWrapper } from "../common/ImageWrapper/ImageWrapper";

interface LinkMenuRowProps {
  title: string;
  linkTo: string;
  iconUrl?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
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
          <ImageWrapper
            src={getMenuIconUrl(iconUrl)}
            width="40px"
            height="40px"
          />
        </div>
      )}
      <div>{title}</div>
    </Link>
  );
};
