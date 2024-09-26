import "./arrow.scss";

type ArrowProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
};

export const Arrow: React.FC<ArrowProps> = ({
  className = "",
  disabled = false,
  onClick,
  width = "15px",
  height = "15px",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 451.846 451.847"
      xmlSpace="preserve"
      className={`${disabled ? "arrow-svg-disabled" : "arrow-svg"} ${className}`}
      onClick={onClick}
    >
      <defs>
        {!disabled ? (
          <linearGradient id="svg-color-gradient">
            <stop offset="0%" stopColor="#fcdc04" />
            <stop offset="100%" stopColor="#f26023" />
          </linearGradient>
        ) : (
          <linearGradient id="svg-color-gradient-disabled">
            <stop offset="0%" stopColor="silver" />
            <stop offset="100%" stopColor="rgb(139 137 137)" />
          </linearGradient>
        )}
      </defs>
      <g>
        <path
          d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
      L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
      c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"
        />
      </g>
    </svg>
  );
};
