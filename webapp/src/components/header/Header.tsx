import { Image } from "../common/Image";

import Settings from "../../settings/appSettings.json";
import "./header.scss";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="./" className="header__container__logo-button">
          <Image className="header__container__image--logo" src={Settings.images.logo} />
        </Link>
        <button>
          <Image className="header__container__image--burger" src={Settings.images.burgerMenu} />{" "}
        </button>
        <button>
          <Image className="header__container__image--cart" src={Settings.images.cart} />
        </button>
      </div>
    </header>
  );
};
