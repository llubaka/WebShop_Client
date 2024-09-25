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
  separators?: Set<string>;
};

export const DropDown: React.FC<DropDownProps> = ({
  options,
  placeholder,
  onChange,
  value,
  hasError,
  errorMessage,
  separators,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const s = separators ? new Set([...separators]) : false;

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

  const handleSeparatorClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const css = hasError ? "drop-down-container error-border" : "drop-down-container";
  const placeholderCss = hasError
    ? "drop-down-container__placeholder error-color"
    : "drop-down-container__placeholder";

  return (
    <div>
      <div
        tabIndex={0}
        className={css}
        onKeyDown={handleKeyDown}
        onClick={handleClicked}
        onBlur={handleBlurred}
      >
        <div className="drop-down-container__svg">
          <Arrow />
        </div>
        {value && <div className="drop-down-container__label">{placeholder}</div>}
        <div className="drop-down-container__value">
          {value || <div className={placeholderCss}>{placeholder}</div>}
        </div>
        {isVisible && (
          <div className="drop-down-container__options">
            {options.map((el) => {
              let showSeparator = false;
              let firstLetter = "";

              if (s) {
                firstLetter = el.substring(0, 1);
                showSeparator = s.has(firstLetter);

                if (showSeparator) {
                  s.delete(firstLetter);
                }
              }

              return (
                <div key={el}>
                  {showSeparator && (
                    <div
                      className="drop-down-container__options--separator"
                      onClick={handleSeparatorClick}
                    >
                      {firstLetter}
                    </div>
                  )}
                  <div
                    className="drop-down-container__options--option"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOnClick(el);
                      hide();
                    }}
                  >
                    {el}
                  </div>
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
