import { Arrow } from "../../svg/Arrow/Arrow";
import styled from "@emotion/styled";
import { ImageWrapper } from "../common/ImageWrapper/ImageWrapper";

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
  return (
    <div key={title} className="menu-row menu-row-expandable" onClick={onClick}>
      {iconUrl && (
        <ImageWrapper
          className="menu-row__icon"
          src={iconUrl}
          width="30px"
          height="30px"
        />
      )}
      <div className="menu-row__title">{title}</div>
      <ArrowContainerStyled isExpanded={isExpanded} className="svg-container">
        <Arrow />
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
