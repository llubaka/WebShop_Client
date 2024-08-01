import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IAutoScrollPage {
  children?: any;
}

export const AutoScrollPage: React.FC<IAutoScrollPage> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};
