import { useState } from "react";
import "./input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const handleFocused = () => {
    setIsClicked(true);
  };

  const handleClicked = () => {
    setIsClicked(true);
    setIsBlurred(false);
  };
  const handleBlurred = () => {
    setIsClicked(false);
    setIsBlurred(true);
  };
  //Adding or removing move-label css
  const css = () => {
    if (props.value && isClicked)
      return "input-container__label move-label colored-label";

    if (isClicked && !props.value)
      return "input-container__label move-label  colored-label";

    if (!isClicked && props.value) return "input-container__label move-label";

    return "input-container__label";
  };
  return (
    <div className="input-container">
      <input
        className="input-container__input"
        {...props}
        onClick={handleClicked}
        onFocus={handleFocused}
        onBlur={handleBlurred}
      />
      <div className={css()}>
        <div className="input-container__label--value">{label}</div>
      </div>
    </div>
  );
};
