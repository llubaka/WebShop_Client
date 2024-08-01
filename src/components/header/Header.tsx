import { Image } from "../common/Image";
import Settings from "../../settings/appSettings.json";
import "./header.scss";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { useCallback, useState } from "react";
import { getCartRouteLink, getHomeRouteLink } from "../../globals/Routes";
import { Menu } from "../menu/Menu";
import { Snackbar } from "../common/Snackbar/Snackbar";
import { useCounter } from "../../helpers/useCounter";

export const Header: React.FC = () => {
  const { cart } = useCartContext();
  const [isSnackbarVisible, setIsSnackBarVisible] = useState(false);

  const closeSnackBar = () => {
    setIsSnackBarVisible(() => false);
  };

  const { restartCountdown } = useCounter(5, closeSnackBar);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleIsMenuOpened = () => {
    setIsMenuOpened((curr) => {
      const nextState = !curr;

      if (nextState) document.body.classList.add("overflow-hidden");
      else document.body.classList.remove("overflow-hidden");

      return nextState;
    });
  };

  const getCartCount = useCallback(() => {
    if (!cart.length) return 0;

    return cart.reduce((acc, curr) => acc + curr.count, 0);
  }, [cart]);

  return (
    <header className="header">
      <div className="header__container">
        <Snackbar
          isVisible={isSnackbarVisible}
          text="Количката е празна"
          onClick={closeSnackBar}
        />
        <Menu
          isMenuOpened={isMenuOpened}
          toggleIsMenuOpened={toggleIsMenuOpened}
        />
        <button onClick={toggleIsMenuOpened}>
          <Image
            className="header__container__image--burger"
            src={Settings.images.burgerMenu}
          />
        </button>

        <Link
          to={getHomeRouteLink()}
          className="header__container__logo-button"
        >
          <Image
            className="header__container__image--logo"
            src={Settings.images.logo}
          />
        </Link>

        <Link
          to={getCartRouteLink()}
          className="header__container__cart-button"
          onClick={(e) => {
            if (getCartCount() === 0) {
              e.preventDefault();
              setIsSnackBarVisible(() => true);
              restartCountdown();
            }
          }}
        >
          <div>
            <Image
              className="header__container__image--cart"
              src={Settings.images.cart}
            />
            <div className="coin-container">
              <Image
                className="header__container__image--coin"
                src={Settings.images.coin}
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
