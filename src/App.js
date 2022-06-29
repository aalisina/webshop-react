import React, { useState, useEffect } from "react";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Details from "./Components/Details.jsx/Details";
import Checkout from "./Components/Checkout/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch (error) {
      console.error("The cart could not be parsed to JSON.");
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  const addToCart = (id, sku) => {
    setCart((curState) => {
      const itemAlreadyInCart = curState.find((item) => item.sku === sku);
      // if(itemAlreadyInCart) itemInCart.quantity++; Doesn't work, need to treat state as immutable
      if (itemAlreadyInCart) {
        // Return a new array with the matching item replaced
        return curState.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Return a new array with the new item attached to it
        return [...curState, { id, sku, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (sku, quantity) => {
    setCart((curItems) => {
      if (quantity === 0) {
        return curItems.filter((item) => item.sku !== sku);
      }
      return curItems.map((item) =>
        item.sku === sku ? { ...item, quantity } : item
      );
    });
  };

  const emptyCart = () => setCart([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation cart={cart} />
        <Routes>
          <Route
            path="/"
            element={<h3>Welcome to the homepage of Health & Fitness</h3>}
          />
          <Route path="/:datatype" element={<Home />} />
          <Route
            path="/:datatype/:id"
            element={<Details addToCart={addToCart} />}
          />
          <Route
            path="cart"
            element={
              <Checkout
                cart={cart}
                updateQuantity={updateQuantity}
                emptyCart={emptyCart}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
