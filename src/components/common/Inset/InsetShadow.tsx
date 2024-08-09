import "./insetShadow.scss";

interface InsetShadowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  side: "top" | "right" | "bottom" | "left";
}

export const InsetShadow: React.FC<InsetShadowProps> = ({ side, ...props }) => {
  return <div {...props} className={`shadow-box-container ${side}-box`}></div>;
};
