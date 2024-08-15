import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./app/App";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
