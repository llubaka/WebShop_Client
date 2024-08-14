import "./deepSeparator.scss";

export const DeepSeparator: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ ...props }) => {
  return <div {...props} className={`deep-separator ${props.className}`}></div>;
};
