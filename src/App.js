import React, { useReducer, useEffect } from "react";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Details from "./Components/Details/Details";
import Checkout from "./Components/Checkout/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cartReducer from "./Reducers/cartReducer";

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
  );
}

export default App;
