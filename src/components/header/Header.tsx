import Settings from "../../settings/appSettings.json";
import "./header.scss";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { useCallback, useState } from "react";
import { getCartRouteLink, getHomeRouteLink } from "../../globals/Routes";
import { Menu } from "../menu/Menu";
import { ImageWrapperNoLazy } from "../common/ImageWrapper/ImageWrapperNoLazy";

type HeaderProps = {
  showSnackbar: () => void;
};

export const Header: React.FC<HeaderProps> = ({ showSnackbar }) => {
  const { cart } = useCartContext();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleIsMenuOpened = () => {
    setIsMenuOpened((curr) => {
      const nextState = !curr;

      if (nextState) document.body.classList.add("overflow-hidden");
      else document.body.classList.remove("overflow-hidden");

      return nextState;
    });
  };

  const handleCartClick = (e: any) => {
    if (getCartCount() === 0) {
      e.preventDefault();
      showSnackbar();
    }
  };

  const getCartCount = useCallback(() => {
    if (!cart.length) return 0;

    return cart.reduce((acc, curr) => acc + curr.count, 0);
  }, [cart]);

  return (
    <header className="header">
      <div className="header__container">
        <Menu
          isMenuOpened={isMenuOpened}
          toggleIsMenuOpened={toggleIsMenuOpened}
        />
        <button onClick={toggleIsMenuOpened}>
          <ImageWrapperNoLazy
            className="header__container__image--burger"
            src={Settings.images.burgerMenu}
            width="55px"
            height="55px"
          />
        </button>

        <Link
          to={getHomeRouteLink()}
          className="header__container__logo-button"
        >
          <ImageWrapperNoLazy
            className="header__container__image--logo"
            src={Settings.images.logo}
            width="70px"
            height="70px"
          />
        </Link>

        <Link
          to={getCartRouteLink()}
          className="header__container__cart-button"
          onClick={handleCartClick}
        >
          <div>
            <ImageWrapperNoLazy
              className="header__container__image--cart"
              src={Settings.images.cart}
              width="50px"
              height="50px"
            />
            <div className="coin-container">
              <img
                className="header__container__image--coin"
                src={Settings.images.coin}
                alt={Settings.images.coin}
              />
              <div
                key={getCartCount()}
                className={`header__container__cart-button--count ${
                  getCartCount() > 0 && "animation"
                }`}
              >
                {getCartCount()}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};
