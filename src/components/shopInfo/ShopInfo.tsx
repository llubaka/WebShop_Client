import { useRef, useState } from "react";
import "./shopInfo.scss";
import styled from "@emotion/styled";
import shopInfo from "../../settings/shopInfo.json";

export const ShopInfo = () => {
  const [collapsed, isCollapsed] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  const toggleIsCollapsed = () => {
    isCollapsed((curr) => !curr);
  };

  return (
    <ShopInfoStyled
      onClick={toggleIsCollapsed}
      collapsed={collapsed}
      offsetHeight={ref.current?.offsetHeight}
      className="shopInfo"
    >
      <div ref={ref}>
        <h1 className="shopInfo__title">{shopInfo.mainTitle}</h1>
        <p>{shopInfo.mainInfo}</p>
        {shopInfo.info.map((el: any) => {
          const type: any = Object.keys(el)[0];

          return (
            <WrapElement type={type} key={el[type]}>
              {el[type]}
            </WrapElement>
          );
        })}
      </div>
    </ShopInfoStyled>
  );
};

const ShopInfoStyled = styled("div")<{
  collapsed: boolean;
  offsetHeight: number | undefined;
}>(({ collapsed, offsetHeight }) => () => {
  if (collapsed)
    return {
      height: "250px",
      WebkitMaskImage:
        " -webkit-gradient(linear, center bottom, center top, color-stop(1.00,  rgba(0,0,0,1)), color-stop(0.00,  rgba(0,0,0,0)))",
    };
  else {
    if (offsetHeight) return { height: `${offsetHeight}px` };
    else return {};
  }
});

const WrapElement = ({ children, type }: { children: any; type: string }) => {
  if (type === "title") return <h2>{children}</h2>;
  if (type === "paragraph") return <p>{children}</p>;

  return <div>{children}</div>;
};
