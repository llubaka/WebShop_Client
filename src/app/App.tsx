import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Home } from "../pages/Home/Home";
import {
  AddProductInCartFuncType,
  CartContext,
  CartType,
  DecreaseProductInCartFuncType,
  RemoveProductInCartFuncType,
} from "../context/cartContext";
import {
  LocalStorageKeys,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../helpers/localStorageFunctions";
import {
  AddFavoriteFuncType,
  FavoriteContext,
  FavoriteType,
} from "../context/favoriteContext";
import { NewProducts } from "../pages/NewProducts/NewProducts";
import { Cart } from "../pages/Cart/Cart";
import { SingleProduct } from "../pages/SingleProduct/SingleProduct";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { ByCategoryProducts } from "../pages/ByCategoryProducts/ByCategoryProducts";
import { FavoriteProducts } from "../pages/FavoriteProducts/FavoriteProducts";
import { Footer } from "../components/footer/Footer";
import { FromBannerProducts } from "../pages/FromBanner/FromBannerProducts";
import {
  Routes as CustomRoutes,
  getCartRouteLink,
  getFavoritesRouteLink,
} from "../globals/Routes";
import { ByTagProcuts } from "../pages/ByTagProducts/ByTagProducts";
import { AutoScrollPage } from "../components/common/AutoScrollPage";
import { FromMenu } from "../pages/FromMenu/FromMenu";
import { Snackbar } from "../components/common/Snackbar/Snackbar";
import { useCounter } from "../helpers/useCounter";

function App() {
  const [cart, setCart] = useState<CartType>([]);
  const [favorites, setFavorites] = useState<FavoriteType>([]);
  const [isFavoriteSnackbarShown, setIsFavoriteSnackbarShown] = useState(false);
  const [isCartSnackbarShown, setIsCartSnackbarShown] = useState(false);

  const [isEmptyCartSnackbarVisible, setIsEmptyCartSnackBarVisible] =
    useState(false);

  const navigate = useNavigate();

  const navigateToFavorites = () => {
    navigate(getFavoritesRouteLink());
    setIsFavoriteSnackbarShown(() => false);
  };

  const navigateToCart = () => {
    navigate(getCartRouteLink());
    setIsCartSnackbarShown(() => false);
  };

  const showEmptyCartSnackbar = () => {
    closeSnackbars();
    setIsEmptyCartSnackBarVisible(() => true);
    restartCountdown();
  };

  const showFavoriteSnackbar = () => {
    closeSnackbars();
    setIsFavoriteSnackbarShown(() => true);
    restartCountdown();
  };

  const showCartSnackbar = () => {
    closeSnackbars();
    setIsCartSnackbarShown(() => true);
    restartCountdown();
  };

  const closeEmptyCartSnackbar = () => {
    setIsEmptyCartSnackBarVisible(() => false);
  };

  const closeSnackbars = useCallback(() => {
    setIsCartSnackbarShown(() => false);
    setIsFavoriteSnackbarShown(() => false);
    setIsEmptyCartSnackBarVisible(() => false);
  }, []);

  const { restartCountdown } = useCounter(5, closeSnackbars);

  const isProductInCart = (productId: string) => {
    return cart.some((el) => el.productId === productId);
  };

  const decreaseProductInCart: DecreaseProductInCartFuncType = (
    productId: string
  ) => {
    if (isProductInCart(productId)) {
      setCart((curr) => {
        const currCount = curr.filter((el) => el.productId === productId)[0]
          .count;

        // Remove
        if (currCount === 1) {
          return curr.filter((pr) => pr.productId !== productId);
        }
        // Decrease
        else {
          const index = curr.findIndex((pr) => pr.productId === productId);
          const newCart = [...curr];
          newCart[index] = {
            productId: newCart[index].productId,
            count: newCart[index].count - 1,
          };
          return newCart;
        }
      });
    }
  };

  const removeProductInCart: RemoveProductInCartFuncType = (
    productId: string
  ) => {
    setCart((curr) => {
      return curr.filter((pr) => pr.productId !== productId);
    });
  };

  const addProductInCart: AddProductInCartFuncType = (
    productId: string,
    showSnackbar: boolean
  ) => {
    setCart((curr) => {
      let newCart: CartType;

      // Empty cart - ADD
      if (curr.length === 0) {
        newCart = [{ productId: productId, count: 1 }];
        setCart(() => newCart);
      }
      // Product already in cart - ADD
      else if (curr.some((pr) => pr.productId === productId)) {
        const index = curr.findIndex((pr) => pr.productId === productId);
        newCart = [...curr];
        newCart[index] = {
          productId: newCart[index].productId,
          count: newCart[index].count + 1,
        };
      }
      // Add product - ADD
      else {
        newCart = [...curr, { productId: productId, count: 1 }];
      }

      showSnackbar && showCartSnackbar();
      setLocalStorageItem(LocalStorageKeys.CART, newCart);

      return newCart;
    });
  };

  const addFavorite: AddFavoriteFuncType = (productId: string) => {
    setFavorites((curr) => {
      let newFavorites: FavoriteType = [];

      // Favorites empty - ADD
      if (curr.length === 0) {
        newFavorites.push(productId);
        showFavoriteSnackbar();
      }
      // Already favorite - REMOVE
      else if (curr.includes(productId)) {
        newFavorites = curr.filter((fav) => fav !== productId);
        setIsFavoriteSnackbarShown(() => false);
      }
      // Add favorite - ADD
      else {
        showFavoriteSnackbar();
        newFavorites = [...curr, productId];
      }

      setLocalStorageItem(LocalStorageKeys.FAVORITES, newFavorites);

      return newFavorites;
    });
  };

  useEffect(() => {
    const lsCart = getLocalStorageItem(LocalStorageKeys.CART);
    if (lsCart) setCart(() => lsCart);

    const lsFavorites = getLocalStorageItem(LocalStorageKeys.FAVORITES);
    if (lsFavorites) setFavorites(() => lsFavorites);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductInCart,
        isProductInCart,
        decreaseProductInCart,
        removeProductInCart,
      }}
    >
      <FavoriteContext.Provider value={{ favorites, addFavorite }}>
        <AutoScrollPage>
          <Snackbar
            isVisible={isFavoriteSnackbarShown}
            text="Добавено в Любими"
            onClick={navigateToFavorites}
          />
          <Snackbar
            isVisible={isCartSnackbarShown}
            text="Добавено в Количката"
            onClick={navigateToCart}
          />
          <Snackbar
            isVisible={isEmptyCartSnackbarVisible}
            text="Количката е празна"
            onClick={closeEmptyCartSnackbar}
          />
          <Header showSnackbar={showEmptyCartSnackbar} />
          <Routes>
            <Route path={CustomRoutes.HOME} element={<Home />} />
            <Route path={CustomRoutes.NEW_PRODUCTS} element={<NewProducts />} />
            <Route path={CustomRoutes.CART} element={<Cart />} />
            <Route
              path={CustomRoutes.FAVORITES}
              element={<FavoriteProducts />}
            />
            <Route
              path={CustomRoutes.SINGLE_PRODUCT}
              element={<SingleProduct />}
            />
            <Route
              path={CustomRoutes.BY_CATEGORY_PRODUCTS}
              element={<ByCategoryProducts />}
            />
            <Route
              path={CustomRoutes.BY_TAG_PRODUCTS}
              element={<ByTagProcuts />}
            />
            <Route
              path={CustomRoutes.FROM_BANNER_PRODUCTS}
              element={<FromBannerProducts />}
            />
            <Route path={CustomRoutes.FROM_MENU} element={<FromMenu />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </AutoScrollPage>
      </FavoriteContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
