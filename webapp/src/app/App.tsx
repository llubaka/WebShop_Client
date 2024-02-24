import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Home } from "../pages/Home/Home";
import { AddProductInCartFuncType, CartContext, CartType } from "../context/cartContext";
import { LocalStorageKeys, getLocalStorageItem, setLocalStorageItem } from "../helpers/localStorageFunctions";
import { AddFavoriteFuncType, FavoriteContext, FavoriteType } from "../context/favoriteContext";
import { NewProducts } from "../pages/NewProducts/NewProducts";

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
    if (!lsCart) return;

    setCart(() => lsCart);
  }, []);

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart, addProductInCart }}>
        <FavoriteContext.Provider value={{ favorites, addFavorite }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewProducts />} />
            <Route path="/:id" element={<div>param</div>} />
            <Route index path="/hello" element={<div> Path </div>} />
            <Route path="*" element={<div> Nothing found </div>} />
          </Routes>
        </FavoriteContext.Provider>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
