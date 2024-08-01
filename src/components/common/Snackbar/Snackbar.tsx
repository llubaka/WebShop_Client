import styled from "@emotion/styled";
import "./snackbar.scss";

type SnackbarProps = {
  text: string;
  isVisible: boolean;
  onClick: () => void;
};

export const Snackbar: React.FC<SnackbarProps> = ({
  text,
  isVisible,
  onClick,
}) => {
  return (
    <SnackbarContainerStyled
      isVisible={isVisible}
      className="snackbar-container"
    >
      <div
        onClick={onClick}
        role="button"
        className="snackbar-container__snackbar"
      >
        <div>{text}</div>
      </div>
    </SnackbarContainerStyled>
  );
};

const SnackbarContainerStyled = styled("div")<{
  isVisible: boolean;
}>(({ isVisible }) => () => {
  if (isVisible)
    return {
      transform: "translateX(0)",
    };
  else {
    return {
      transform: "translateX(-100%)",
    };
  }
});
