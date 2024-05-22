import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Home } from "../pages/Home/Home";
import { AddProductInCartFuncType, CartContext, CartType } from "../context/cartContext";
import { LocalStorageKeys, getLocalStorageItem, setLocalStorageItem } from "../helpers/localStorageFunctions";
import { AddFavoriteFuncType, FavoriteContext, FavoriteType } from "../context/favoriteContext";
import { NewProducts } from "../pages/NewProducts/NewProducts";
import { Cart } from "../pages/Cart/Cart";
import { SingleProduct } from "../pages/SingleProduct/SingleProduct";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { ByCategoryProducts } from "../pages/ByCategoryProducts/ByCategoryProducts";
import { FavoriteProducts } from "../pages/FavoriteProducts/FavoriteProducts";
import { Footer } from "../components/footer/Footer";
import { FromBannerProducts } from "../pages/FromBanner/FromBannerProducts";
import { Routes as CustomRoutes } from "../globals/Routes";
import { ByTagProcuts } from "../pages/ByTagProducts/ByTagProducts";
import { AutoScrollPage } from "../components/common/AutoScrollPage";

function App() {
  const [cart, setCart] = useState<CartType>([]);
  const [favorites, setFavorites] = useState<FavoriteType>([]);

  const addProductInCart: AddProductInCartFuncType = (productId: string) => {
    setCart((curr) => {
      let newCart: CartType;

      // Empty cart
      if (curr.length === 0) {
        newCart = [{ productId: productId, count: 1 }];
        setCart(() => newCart);
      }
      // Product already in cart
      else if (curr.some((pr) => pr.productId === productId)) {
        const index = curr.findIndex((pr) => pr.productId === productId);
        newCart = [...curr];
        newCart[index] = { productId: newCart[index].productId, count: newCart[index].count + 1 };
        // Add product
      } else {
        newCart = [...curr, { productId: productId, count: 1 }];
      }

      setLocalStorageItem(LocalStorageKeys.CART, newCart);

      return newCart;
    });
  };

  const addFavorite: AddFavoriteFuncType = (productId: string) => {
    setFavorites((curr) => {
      let newFavorites: FavoriteType = [];

      // Favorites empty
      if (curr.length === 0) {
        newFavorites.push(productId);
      }
      // Already favorite
      else if (curr.includes(productId)) {
        newFavorites = curr.filter((fav) => fav !== productId);
      }
      // Add favorite
      else {
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
    <BrowserRouter>
      <CartContext.Provider value={{ cart, addProductInCart }}>
        <FavoriteContext.Provider value={{ favorites, addFavorite }}>
          <AutoScrollPage>
            <Header />
            <Routes>
              <Route path={CustomRoutes.HOME} element={<Home />} />
              <Route path={CustomRoutes.NEW_PRODUCTS} element={<NewProducts />} />
              <Route path={CustomRoutes.CART} element={<Cart />} />
              <Route path={CustomRoutes.FAVORITES} element={<FavoriteProducts />} />
              <Route path={CustomRoutes.SINGLE_PRODUCT} element={<SingleProduct />} />
              <Route path={CustomRoutes.BY_CATEGORY_PRODUCTS} element={<ByCategoryProducts />} />
              <Route path={CustomRoutes.BY_TAG_PRODUCTS} element={<ByTagProcuts />} />
              <Route path={CustomRoutes.FROM_BANNER_PRODUCTS} element={<FromBannerProducts />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </AutoScrollPage>
        </FavoriteContext.Provider>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
