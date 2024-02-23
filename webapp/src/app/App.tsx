import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Home } from "../pages/Home/Home";
import { AddProductInCartFuncType, CartContext, CartType } from "../context/cartContext";
import { LocalStorageKeys, getLocalStorageItem, setLocalStorageItem } from "../helpers/localStorageFunctions";

function App() {
  const [cart, setCart] = useState<CartType>([]);

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

  useEffect(() => {
    const lsCart = getLocalStorageItem(LocalStorageKeys.CART);
    if (!lsCart) return;

    setCart(() => lsCart);
  }, []);

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart, addProductInCart }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<div>param</div>} />
          <Route index path="/hello" element={<div> Path </div>} />
          <Route path="*" element={<div> Else </div>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
