import { Image } from "../common/Image";
import Settings from "../../settings/appSettings.json";
import "./header.scss";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { useCallback, useState } from "react";
import { getCartRouteLink, getHomeRouteLink } from "../../globals/Routes";

export const Header: React.FC = () => {
  const { cart } = useCartContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleIsMenuOpened = () => {
    setIsMenuOpened((curr) => !curr);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const getCartCount = useCallback(() => {
    if (!cart.length) return 0;

    return cart.reduce((acc, curr) => acc + curr.count, 0);
  }, [cart]);

  const navClass = isMenuOpened ? "menu-container__menu menu-container__menu--opened" : "menu-container__menu";
  const menuClass = isMenuOpened ? "menu-container menu-container--opened" : "menu-container";

  return (
    <header className="header">
      <div className={menuClass} onClick={toggleIsMenuOpened}>
        <nav className={navClass} onClick={handleMenuClick}></nav>
      </div>

      <div className="header__container">
        <button onClick={toggleIsMenuOpened}>
          <Image className="header__container__image--burger" src={Settings.images.burgerMenu} />
        </button>

        <Link to={getHomeRouteLink()} className="header__container__logo-button">
          <Image className="header__container__image--logo" src={Settings.images.logo} />
        </Link>

        <Link to={getCartRouteLink()} className="header__container__cart-button">
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
