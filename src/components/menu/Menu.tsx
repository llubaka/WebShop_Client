import MenuSettings from "../../settings/menuSettings.json";
import "./menu.scss";
import {
  getByCategoryProductsLink,
  getCartRouteLink,
  getFavoritesRouteLink,
  getFromMenuProductsLink,
} from "../../globals/Routes";
import React, { useCallback, useState } from "react";
import Settings from "../../settings/appSettings.json";
import { LinkMenuRow } from "./LinkMenuRow";
import { MenuRow } from "./MenuRow";
import styled from "@emotion/styled";
import { useFavoriteContext } from "../../context/favoriteContext";
import { useCartContext } from "../../context/cartContext";
import { React100vhDiv } from "../common/React100vhDiv";
import { ImageWrapper } from "../common/ImageWrapper/ImageWrapper";

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

  const [isMenuRowOpened, setIsMenuRowOpened] = useState<any>({});

  const { favorites } = useFavoriteContext();
  const { cart } = useCartContext();

  const getCartCount = useCallback(() => {
    if (!cart.length) return 0;

    return cart.reduce((acc, curr) => acc + curr.count, 0);
  }, [cart]);

  const toggleIsMenuRowOpened = (rowTitle: string) => {
    setIsMenuRowOpened((prev: any) => {
      return { ...prev, [rowTitle]: !prev[rowTitle] };
    });
  };

  const handleCartClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (getCartCount() === 0) {
      e.preventDefault();
    } else {
      toggleIsMenuOpened();
    }
  };

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (favorites.length === 0) {
      e.preventDefault();
    } else {
      toggleIsMenuOpened();
    }
  };

  const getMenuContent = useCallback(() => {
    return MenuSettings.map((el) => {
      if (el.category)
        return (
          <LinkMenuRow
            key={el.title}
            linkTo={getByCategoryProductsLink(el.category)}
            title={el.title}
            iconUrl={el.iconUrl}
            onClick={toggleIsMenuOpened}
          />
        );
      if (el.tags.length > 0)
        return (
          <LinkMenuRow
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
            <MenuRow
              iconUrl={el.iconUrl}
              title={el.title}
              onClick={() => toggleIsMenuRowOpened(el.title)}
              isExpanded={isMenuRowOpened[el.title]}
            />

            <InnerContainerStyled
              innerRows={el.subMenu.length}
              isExpanded={isMenuRowOpened[el.title]}
              className="menu-content__inner__content"
            >
              {el.subMenu.map((subMenuElement) => {
                if (subMenuElement.category)
                  return (
                    <LinkMenuRow
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
                    <LinkMenuRow
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
            </InnerContainerStyled>
          </div>
        );
      }

      return <React.Fragment key={el.title}></React.Fragment>;
    });
  }, [isMenuRowOpened, toggleIsMenuOpened]);

  return (
    <div className={menuClass} onClick={toggleIsMenuOpened}>
      <nav className={navClass} onClick={handleMenuClick}>
        <div className="menu-content">
          <div className="menu-content--header" onClick={toggleIsMenuOpened}>
            <ImageWrapper
              className="header__container__image--logo"
              src={Settings.images.logo}
              width="70px"
              height="70px"
            />
            <div className="menu-content--header--appname">
              {Settings.appName}
            </div>
          </div>
          <React100vhDiv className="menu-content__rows">
            {Settings.images.menuCart && (
              <LinkMenuRow
                linkTo={getCartRouteLink()}
                title={`КОЛИЧКА (${getCartCount()})`}
                iconUrl={Settings.images.menuCart}
                onClick={handleCartClick}
              />
            )}
            {Settings.images.menuFavorite && (
              <LinkMenuRow
                linkTo={getFavoritesRouteLink()}
                title={`ЛЮБИМИ (${favorites.length})`}
                iconUrl={Settings.images.menuFavorite}
                onClick={handleFavoriteClick}
              />
            )}
            {getMenuContent()}
          </React100vhDiv>
        </div>
      </nav>
    </div>
  );
};

const InnerContainerStyled = styled("div")<{
  isExpanded: boolean;
  innerRows: number;
}>(({ isExpanded, innerRows }) => () => {
  if (isExpanded)
    return {
      maxHeight: innerRows * 54 + "px",
    };
});
