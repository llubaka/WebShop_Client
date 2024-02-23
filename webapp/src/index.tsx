import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { ErrorBoundary } from "react-error-boundary";
import { CartContext } from "./context/cartContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <CartContext.Provider value={["1"]}>
        <App />
      </CartContext.Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
