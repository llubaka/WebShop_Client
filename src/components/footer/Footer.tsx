import { ShopDescription } from "../shopFeatures/ShopFeatures";
import "./footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <ShopDescription />
      <div className="footer__info">All rights reserved 2024</div>
    </footer>
  );
};
