import { Arrow } from "../../svg/Arrow";
import styled from "@emotion/styled";

interface MenuRowProps {
  title: string;
  isExpanded: boolean;
  iconUrl?: string;
  onClick?: () => void;
}

export const MenuRow: React.FC<MenuRowProps> = ({
  title,
  isExpanded,
  iconUrl,
  onClick,
}) => {
  const getMenuIconUrl = (iconUrl: string) => {
    return `/menu/${iconUrl}`;
  };
  return (
    <div key={title} className="menu-row menu-row-expandable" onClick={onClick}>
      {iconUrl && <img src={getMenuIconUrl(iconUrl)} alt={iconUrl} />}
      <div>{title}</div>
      <ArrowContainerStyled isExpanded={isExpanded} className="svg-container">
        <Arrow color="#2d2c2c" />
      </ArrowContainerStyled>
    </div>
  );
};

const ArrowContainerStyled = styled("div")<{
  isExpanded: boolean;
}>(({ isExpanded }) => () => {
  if (isExpanded)
    return {
      transform: "rotate(90deg)",
    };

  return {};
});
