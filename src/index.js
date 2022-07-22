import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { CartProvider } from "./Contexts/cartContext"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    {/* // The provider determines which states and functions are shared via the context 
    // The provider accepts one prop which is the value prop which determines what will be shared 
    // via the context, we can pass it down as an object. These values can be consumed using the 
    // CartContext */}
      <CartProvider>
        <App />
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
