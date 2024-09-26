import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Home } from "../pages/Home/Home";
import {
  AddProductInCartFuncType,
  CartContext,
  CartType,
  ClearCartFuncType,
  DecreaseProductInCartFuncType,
  RemoveProductInCartFuncType,
} from "../context/cartContext";
import {
  LocalStorageKeys,
  clearLocalStorageItem,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../helpers/localStorageFunctions";
import { AddFavoriteFuncType, FavoriteContext, FavoriteType } from "../context/favoriteContext";
import { NewProductsPage } from "../pages/HomePageProducts/NewProductsPage";
import { Cart } from "../pages/Cart/Cart";
import { SingleProduct } from "../pages/SingleProduct/SingleProduct";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { FavoriteProducts } from "../pages/FavoriteProducts/FavoriteProducts";
import { Footer } from "../components/footer/Footer";
import { FromBannerProducts } from "../pages/FromBanner/FromBannerProducts";
import { Routes as CustomRoutes, getCartRouteLink, getFavoritesRouteLink } from "../globals/Routes";
import { ByTagProcuts } from "../pages/ByTagProducts/ByTagProducts";
import { AutoScrollPage } from "../components/common/AutoScrollPage";
import { FromMenu } from "../pages/FromMenu/FromMenu";
import { Snackbar } from "../components/common/Snackbar/Snackbar";
import { useCounter } from "../helpers/useCounter";
import { SeenContext } from "../context/seenContext";
import {
  clearSessionStorageItem,
  getSessionStorageItem,
  SessionStorageKeys,
  setSessionStorageItem,
} from "../helpers/sessionStorageFunctions";
import { useChangeTitle } from "./useChangeTitle";
import { MakeOrder } from "../components/common/MakeOrder/MakeOrder";
import { CompliancePage } from "../pages/Compliance/CompliancePage";
import { PolicyPopUp } from "../components/common/PolicyPopUp/PolicyPopUp";
import { productExists } from "../data/getData/productExists";

function App() {
  const [cart, setCart] = useState<CartType>([]);
  const [favorites, setFavorites] = useState<FavoriteType>([]);
  const [seen, setSeen] = useState<Set<string>>(new Set<string>());
  const [isFavoriteSnackbarShown, setIsFavoriteSnackbarShown] = useState(false);
  const [isCartSnackbarShown, setIsCartSnackbarShown] = useState(false);
  const [isEmptyCartSnackbarVisible, setIsEmptyCartSnackBarVisible] = useState(false);
  const [isEmptyFavoriteSnackbarVisible, setIsEmptyFavoriteSnackbarVisible] = useState(false);
  const [isFinishedOrderSnackbarVisible, setIsFinishedOrderSnackbarVisible] = useState(false);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [hasAgreedToPolicy, setHasAgreedToPolicy] = useState(false);

  const navigate = useNavigate();
  useChangeTitle();
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

  const showFinishedOrderSnackbar = () => {
    closeSnackbars();
    setIsFinishedOrderSnackbarVisible(() => true);
    restartCountdown();
  };

  const closeEmptyCartSnackbar = () => {
    setIsEmptyCartSnackBarVisible(() => false);
  };

  const closeEmptyFavoriteSnackbar = () => {
    setIsEmptyFavoriteSnackbarVisible(() => false);
  };

  const closeFinishedOrderSnackbar = () => {
    setIsFinishedOrderSnackbarVisible(() => false);
  };

  const closeSnackbars = useCallback(() => {
    setIsCartSnackbarShown(() => false);
    setIsFavoriteSnackbarShown(() => false);
    setIsEmptyCartSnackBarVisible(() => false);
    setIsEmptyFavoriteSnackbarVisible(() => false);
    setIsFinishedOrderSnackbarVisible(() => false);
  }, []);

  const { restartCountdown } = useCounter(5, closeSnackbars);

  const isProductInCart = (productId: string) => {
    return cart.some((el) => el.productId === productId);
  };

  const decreaseProductInCart: DecreaseProductInCartFuncType = (productId: string) => {
    if (isProductInCart(productId)) {
      let newCart: CartType;
      setCart((curr) => {
        const currCount = curr.filter((el) => el.productId === productId)[0].count;

        // Remove
        if (currCount === 1) {
          newCart = curr.filter((pr) => pr.productId !== productId);
        }
        // Decrease
        else {
          const index = curr.findIndex((pr) => pr.productId === productId);
          newCart = [...curr];
          newCart[index] = {
            productId: newCart[index].productId,
            count: newCart[index].count - 1,
          };
        }

        setLocalStorageItem(LocalStorageKeys.CART, newCart);
        if (newCart.length === 0) showEmptyCartSnackbar();

        return newCart;
      });
    }
  };

  const removeProductInCart: RemoveProductInCartFuncType = (productId: string) => {
    setCart((curr) => {
      const newCart = curr.filter((pr) => pr.productId !== productId);

      setLocalStorageItem(LocalStorageKeys.CART, newCart);
      if (newCart.length === 0) showEmptyCartSnackbar();

      return newCart;
    });
  };

  const addProductInCart: AddProductInCartFuncType = (productId: string, showSnackbar: boolean) => {
    setCart((curr) => {
      let newCart: CartType;

      // Empty cart - ADD
      if (curr.length === 0) {
        newCart = [{ productId: productId, count: 1 }];
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

  const clearCart: ClearCartFuncType = () => {
    setCart([]);
    setLocalStorageItem(LocalStorageKeys.CART, []);
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
      if (newFavorites.length === 0) setIsEmptyFavoriteSnackbarVisible(() => true);

      return newFavorites;
    });
  };

  const setSeenImages: any = (imgSrc: string) => {
    setSeen((curr) => {
      const newSeenImages = [...curr, imgSrc];
      setSessionStorageItem(SessionStorageKeys.SEEN_IMAGES, newSeenImages);

      return new Set(newSeenImages);
    });
  };

  const showOrderModal = () => {
    setIsOrderModalVisible(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalVisible(false);
  };

  useEffect(() => {
    try {
      const lsCart: CartType = getLocalStorageItem(LocalStorageKeys.CART);
      const filterCart = lsCart.filter((el) => productExists(el.productId));
      if (lsCart) setCart(() => filterCart);
    } catch (error) {
      clearLocalStorageItem(LocalStorageKeys.CART);
    }

    try {
      const lsFavorites: FavoriteType = getLocalStorageItem(LocalStorageKeys.FAVORITES);
      const filterFavorites = lsFavorites.filter((productId) => productExists(productId));
      if (lsFavorites) setFavorites(() => filterFavorites);
    } catch (error) {
      clearLocalStorageItem(LocalStorageKeys.FAVORITES);
    }

    try {
      const lsAgreedToPolicy: boolean = getLocalStorageItem(LocalStorageKeys.AGREED_TO_POLICY);
      if (lsAgreedToPolicy) setHasAgreedToPolicy(() => lsAgreedToPolicy);
    } catch (error) {
      clearLocalStorageItem(LocalStorageKeys.AGREED_TO_POLICY);
    }

    try {
      const ssSeen = getSessionStorageItem(SessionStorageKeys.SEEN_IMAGES);
      if (ssSeen) setSeen(() => new Set(ssSeen));
    } catch (error) {
      clearSessionStorageItem(SessionStorageKeys.SEEN_IMAGES);
    }
  }, []);

  const handleAgree = () => {
    setHasAgreedToPolicy(true);
    setLocalStorageItem(LocalStorageKeys.AGREED_TO_POLICY, true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductInCart,
        isProductInCart,
        decreaseProductInCart,
        removeProductInCart,
        clearCart,
      }}
    >
      <FavoriteContext.Provider value={{ favorites, addFavorite }}>
        <SeenContext.Provider value={{ seen, setSeen: setSeenImages }}>
          <AutoScrollPage>
            {!hasAgreedToPolicy && <PolicyPopUp onAgree={handleAgree} />}
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
            <Snackbar
              isVisible={isEmptyFavoriteSnackbarVisible}
              text="Няма любими"
              onClick={closeEmptyFavoriteSnackbar}
            />

            <Snackbar
              isVisible={isFinishedOrderSnackbarVisible}
              text="Поръчката е завършена"
              onClick={closeFinishedOrderSnackbar}
            />

            <MakeOrder
              isVisible={isOrderModalVisible}
              closeModal={closeOrderModal}
              showSnackbar={showFinishedOrderSnackbar}
            />
            <Header showSnackbar={showEmptyCartSnackbar} closeSnackbars={closeSnackbars} />
            <div className="main-content-contaier">
              <Routes>
                <Route path={CustomRoutes.HOME} element={<Home />} />
                <Route path={CustomRoutes.NEW_PRODUCTS_PAGE} element={<NewProductsPage />} />
                <Route path={CustomRoutes.CART} element={<Cart setVisible={showOrderModal} />} />
                <Route path={CustomRoutes.FAVORITES} element={<FavoriteProducts />} />
                <Route path={CustomRoutes.SINGLE_PRODUCT} element={<SingleProduct />} />
                <Route path={CustomRoutes.BY_TAG_PRODUCTS} element={<ByTagProcuts />} />
                <Route path={CustomRoutes.FROM_BANNER_PRODUCTS} element={<FromBannerProducts />} />
                <Route path={CustomRoutes.FROM_MENU} element={<FromMenu />} />
                <Route path={CustomRoutes.COMPLIANCE_PAGE} element={<CompliancePage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
            <Footer />
          </AutoScrollPage>
        </SeenContext.Provider>
      </FavoriteContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
