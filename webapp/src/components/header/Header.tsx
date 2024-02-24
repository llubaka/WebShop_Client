import { Image } from "../common/Image";
import Settings from "../../settings/appSettings.json";
import "./header.scss";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { useCallback } from "react";
import { Routes } from "../../globals/Routes";

export const Header: React.FC = () => {
  const { cart } = useCartContext();

  const getCartCount = useCallback(() => {
    if (!cart.length) return 0;

    return cart.reduce((acc, curr) => acc + curr.count, 0);
  }, [cart]);

  return (
    <header className="header">
      <div className="header__container">
        <Link to={Routes.HOME} className="header__container__logo-button">
          <Image className="header__container__image--logo" src={Settings.images.logo} />
        </Link>
        <button>
          <Image className="header__container__image--burger" src={Settings.images.burgerMenu} />
        </button>
        <Link to={Routes.CART} className="header__container__cart-button">
          <div
            key={getCartCount()}
            className={`header__container__cart-button--count ${getCartCount() > 0 && "animation"}`}
          >
            {getCartCount()}
          </div>
          <Image className="header__container__image--cart" src={Settings.images.cart} />
        </Link>
      </div>
    </header>
  );
};
