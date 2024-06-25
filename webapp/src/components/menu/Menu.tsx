import { Link } from "react-router-dom";
import MenuSettings from "../../settings/menuSettings.json";
import "./menu.scss";
import { getByCategoryProductsLink, getFromMenuProductsLink } from "../../globals/Routes";
import React, { useCallback } from "react";

interface IMenu {
  isMenuOpened: boolean;
  toggleIsMenuOpened: () => void;
}

export const Menu: React.FC<IMenu> = ({ isMenuOpened, toggleIsMenuOpened }) => {
  const navClass = isMenuOpened ? "menu-container__menu menu-container__menu--opened" : "menu-container__menu";
  const menuClass = isMenuOpened ? "menu-container menu-container--opened" : "menu-container";

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const getMenuContent = useCallback(() => {
    return MenuSettings.map((el) => {
      if (el.category)
        return (
          <Link key={el.title} to={getByCategoryProductsLink(el.category)} onClick={toggleIsMenuOpened}>
            {el.title}
          </Link>
        );
      if (el.tags.length > 0)
        return (
          <Link key={el.title} to={getFromMenuProductsLink(el.id.toString(), "false")} onClick={toggleIsMenuOpened}>
            {el.title}
          </Link>
        );

      if (el.subMenu.length > 0) {
        return (
          <div key={el.title} className="menu-content__inner">
            <div className="menu-content__inner__title">{el.title}</div>
            <div className="menu-content__inner__content">
              {el.subMenu.map((subMenuElement) => {
                if (subMenuElement.category)
                  return (
                    <Link
                      key={subMenuElement.title}
                      to={getByCategoryProductsLink(subMenuElement.category)}
                      onClick={toggleIsMenuOpened}
                    >
                      {subMenuElement.title}
                    </Link>
                  );
                if (subMenuElement.tags.length > 0)
                  return (
                    <Link
                      key={subMenuElement.title}
                      to={getFromMenuProductsLink(subMenuElement.id.toString(), "true")}
                      onClick={toggleIsMenuOpened}
                    >
                      {subMenuElement.title}
                    </Link>
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
        <div className="menu-content">{getMenuContent()}</div>
      </nav>
    </div>
  );
};
