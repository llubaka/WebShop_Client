import { useState } from "react";
import "./input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hasError: boolean;
  errorMessage: string;
  forceShowError: boolean;
  onBlur: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  hasError,
  errorMessage,
  forceShowError,
  onBlur,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleFocused = () => {
    setIsClicked(true);
  };

  const handleClicked = () => {
    setIsClicked(true);
    setIsBlurred(false);
  };
  const handleBlurred = () => {
    onBlur && onBlur();
    setIsActivated(true);
    setIsClicked(false);
    setIsBlurred(true);
  };

  const showError = () => {
    return hasError && (isActivated || forceShowError);
  };

  //Adding or removing move-label css
  const css = () => {
    if (props.value && isClicked)
      return "input-container__label move-label colored-label";

    if (isClicked && !props.value)
      return "input-container__label move-label colored-label";

    if (!isClicked && props.value)
      return "input-container__label move-label colored-label";

    return "input-container__label";
  };
  return (
    <div className="input-out-container">
      <div className="input-container">
        <input
          style={showError() ? { border: "2px solid rgb(255, 90, 90)" } : {}}
          className="input-container__input"
          {...props}
          onClick={handleClicked}
          onFocus={handleFocused}
          onBlur={handleBlurred}
        />
        <div className={css()}>
          <div
            className="input-container__label--value"
            style={showError() ? { color: "rgb(255, 90, 90)" } : {}}
          >
            {label}
          </div>
        </div>
      </div>
      {showError() && (
        <div className="input-container__error">{errorMessage}</div>
      )}
    </div>
  );
};
