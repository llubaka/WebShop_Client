import MenuSettings from "../../settings/menuSettings.json";
import "./menu.scss";
import {
  getByCategoryProductsLink,
  getFromMenuProductsLink,
} from "../../globals/Routes";
import React, { useCallback } from "react";
import { Image } from "../common/Image";
import Settings from "../../settings/appSettings.json";
import { MenuRow } from "./MenuRow";

interface IMenu {
  isMenuOpened: boolean;
  toggleIsMenuOpened: () => void;
}

export const Menu: React.FC<IMenu> = ({ isMenuOpened, toggleIsMenuOpened }) => {
  const navClass = isMenuOpened
    ? "menu-container__menu menu-container__menu--opened"
    : "menu-container__menu";
  const menuClass = isMenuOpened
    ? "menu-container menu-container--opened"
    : "menu-container";

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const getMenuContent = useCallback(() => {
    return MenuSettings.map((el) => {
      if (el.category)
        return (
          <MenuRow
            key={el.title}
            linkTo={getByCategoryProductsLink(el.category)}
            title={el.title}
            iconUrl={el.iconUrl}
            onClick={toggleIsMenuOpened}
          />
        );
      if (el.tags.length > 0)
        return (
          <MenuRow
            key={el.title}
            linkTo={getFromMenuProductsLink(el.id.toString(), "false")}
            title={el.title}
            iconUrl={el.iconUrl}
            onClick={toggleIsMenuOpened}
          />
        );

      if (el.subMenu.length > 0) {
        return (
          <div key={el.title} className="menu-content__inner">
            <div className="menu-content__inner__title">{el.title}</div>
            <div className="menu-content__inner__content">
              {el.subMenu.map((subMenuElement) => {
                if (subMenuElement.category)
                  return (
                    <MenuRow
                      key={subMenuElement.title}
                      linkTo={getByCategoryProductsLink(
                        subMenuElement.category
                      )}
                      title={subMenuElement.title}
                      iconUrl={subMenuElement.iconUrl}
                      onClick={toggleIsMenuOpened}
                    />
                  );
                if (subMenuElement.tags.length > 0)
                  return (
                    <MenuRow
                      key={subMenuElement.title}
                      linkTo={getFromMenuProductsLink(
                        subMenuElement.id.toString(),
                        "true"
                      )}
                      title={subMenuElement.title}
                      iconUrl={subMenuElement.iconUrl}
                      onClick={toggleIsMenuOpened}
                    />
                  );

                return <></>;
              })}
            </div>
          </div>
        );
      }

      return <React.Fragment key={el.title}></React.Fragment>;
    });
  }, [toggleIsMenuOpened]);

  return (
    <div className={menuClass} onClick={toggleIsMenuOpened}>
      <nav className={navClass} onClick={handleMenuClick}>
        <div className="menu-content">
          <div className="menu-content--header" onClick={toggleIsMenuOpened}>
            <Image
              className="header__container__image--logo"
              src={Settings.images.logo}
            />
            <div className="menu-content--header--appname">
              {Settings.appName}
            </div>
          </div>
          {getMenuContent()}
        </div>
      </nav>
    </div>
  );
};
