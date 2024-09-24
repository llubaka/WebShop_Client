import "./dropDown.scss";
import { Arrow } from "../../../svg/Arrow/Arrow";
import { useState } from "react";

type DropDownProps = {
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  hasError: boolean;
  errorMessage: string;
};

export const DropDown: React.FC<DropDownProps> = ({
  options,
  placeholder,
  onChange,
  value,
  hasError,
  errorMessage,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClicked = () => {
    setIsVisible((prev) => !prev);
  };

  const handleBlurred = () => {
    setIsVisible(false);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const handleOnClick = (value: string) => {
    onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setIsVisible((prev) => !prev);
    }
  };

  const css = hasError ? "drop-down-container error-border" : "drop-down-container";
  const placeholderCss = hasError ? "drop-down-container__placeholder error-color" : "drop-down-container__placeholder";

  return (
    <div>
      <div tabIndex={0} className={css} onKeyDown={handleKeyDown} onClick={handleClicked} onBlur={handleBlurred}>
        <div className="drop-down-container__svg">
          <Arrow />
        </div>
        {value && <div className="drop-down-container__label">{placeholder}</div>}
        <div className="drop-down-container__value">{value || <div className={placeholderCss}>{placeholder}</div>}</div>
        {isVisible && (
          <div className="drop-down-container__options">
            {options.map((el) => {
              return (
                <div
                  className="drop-down-container__options--option"
                  key={el}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOnClick(el);
                    hide();
                  }}
                >
                  {el}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {hasError && <div className="drop-down-container__error">{errorMessage} </div>}
    </div>
  );
};
