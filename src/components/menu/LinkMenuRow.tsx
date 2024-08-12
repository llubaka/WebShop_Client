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
  return (
    <Link
      key={title}
      to={linkTo}
      onClick={onClick}
      className="menu-row"
      aria-label={`Navigate to ${title}`}
    >
      {iconUrl && (
        <div className="menu-row-img-container">
          <ImageWrapper
            className="menu-row__icon"
            src={iconUrl}
            width="30px"
            height="30px"
          />
        </div>
      )}
      <div className="menu-row__title">{title}</div>
    </Link>
  );
};
