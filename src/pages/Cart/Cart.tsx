import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import "./cart.scss";

export const Cart = () => {
  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content="Количка" />
    </div>
  );
};
