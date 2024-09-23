import ReactDropdown from "react-dropdown";
import "./dropDown.scss";
import { Arrow } from "../../../svg/Arrow/Arrow";

type DropDownProps = {
  options: string[];
  placeholder: string;
  onChange: (arg: string) => void;
  value: string;
  disabled?: boolean;
  hasError: boolean;
  errorMessage: string;
};

const ArrowSvg = () => {
  return (
    <div className="dropdown-arrow-svg-container">
      <Arrow />
    </div>
  );
};

export const DropDown: React.FC<DropDownProps> = ({
  options,
  placeholder,
  onChange,
  value,
  hasError,
  errorMessage,
  disabled = false,
}) => {
  const css = hasError ? "dropdown-ccn dropdown-error-css" : "dropdown-ccn";

  return (
    <div>
      <ReactDropdown
        value={value}
        placeholderClassName="dropdown-placeholder"
        controlClassName={css}
        menuClassName="dropdown-menu"
        options={options}
        placeholder={placeholder}
        arrowClosed={<ArrowSvg />}
        arrowOpen={<ArrowSvg />}
        onChange={(option) => onChange(option.value)}
        disabled={disabled}
      />
      {hasError && <div className="dd-error-message">{errorMessage} </div>}
    </div>
  );
};
