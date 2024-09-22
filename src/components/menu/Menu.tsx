import MenuContent from "../../settings/menuContent.json";
import "./menu.scss";
import {
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
import { InsetShadow } from "../common/Inset/InsetShadow";
import { ImageWrapperNoLazy } from "../common/ImageWrapper/ImageWrapperNoLazy";
import { QueryParam } from "../../helpers/enum";

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
    return MenuContent.map((el) => {
      if (el.subMenu.length > 0) {
        return (
          <div key={el.id} className="menu-content__inner">
            <MenuRow
              iconUrl={el.iconUrl}
              title={el.title}
              onClick={() => toggleIsMenuRowOpened(el.id)}
              isExpanded={isMenuRowOpened[el.id]}
            />
            <InnerContainerStyled
              innerRows={el.subMenu.length}
              isExpanded={isMenuRowOpened[el.id]}
              className="menu-content__inner__content"
            >
              <InsetShadow
                side="top"
                style={{ top: 0, left: 0, width: "calc(100% + 20px)" }}
              />
              {el.subMenu.map((subMenuElement) => {
                if (subMenuElement.tags.length > 0)
                  return (
                    <LinkMenuRow
                      key={subMenuElement.id}
                      linkTo={getFromMenuProductsLink(el.id, subMenuElement.id)}
                      title={subMenuElement.title}
                      iconUrl={subMenuElement.iconUrl}
                      onClick={toggleIsMenuOpened}
                    />
                  );

                return <></>;
              })}
              <InsetShadow
                side="bottom"
                style={{ bottom: 0, left: 0, width: "calc(100% + 20px)" }}
              />
            </InnerContainerStyled>
          </div>
        );
      }
      if (el.tags.length > 0) {
        return (
          <LinkMenuRow
            key={el.id}
            linkTo={getFromMenuProductsLink(el.id, QueryParam.NOT_SUBMENU)}
            title={el.title}
            iconUrl={el.iconUrl}
            onClick={toggleIsMenuOpened}
          />
        );
      }

      return <React.Fragment key={el.id}></React.Fragment>;
    });
  }, [isMenuRowOpened, toggleIsMenuOpened]);

  return (
    <div className={menuClass} onClick={toggleIsMenuOpened}>
      <nav className={navClass} onClick={handleMenuClick}>
        <div className="menu-content">
          <div className="menu-content--header" onClick={toggleIsMenuOpened}>
            <ImageWrapperNoLazy
              className="header__container__image--logo"
              src={Settings.images.logo}
              width="70px"
              height="70px"
            />
            <div className="menu-content--header--appname">
              {Settings.appName}
            </div>
          </div>
          <React100vhDiv heightOffset={90} className="menu-content__rows">
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
