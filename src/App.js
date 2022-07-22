import React, { useReducer, useEffect } from "react";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Details from "./Components/Details/Details";
import Checkout from "./Components/Checkout/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cartReducer from "./Reducers/cartReducer";
import { CartContext } from "./Contexts/cartContext";

let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch (error) {
  console.error("The cart could not be parsed to JSON.");
  initialCart = [];
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    // The provider determines which states and functions are shared via the context 
    // The provider accepts one prop which is the value prop which determines what will be shared 
    // via the context, we can pass it down as an object. These values can be consumed using the 
    // CartContext
    <CartContext.Provider value={{cart, dispatch}}>
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
            element={<Details dispatch={dispatch} />}
            />
            <Route
            path="cart"
            element={<Checkout cart={cart} dispatch={dispatch} />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </CartContext.Provider>
  );
}

export default App;
