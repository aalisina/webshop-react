import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from "../Reducers/cartReducer";


// Possible to pass a default value as a parameter: React.createContext(param)
// The default value applies when a component tries to consume the context without being nested under
// a provider 
const CartContext = React.createContext(null);

let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch (error) {
  console.error("The cart could not be parsed to JSON.");
  initialCart = [];
}
export function CartProvider(props) {
    
    const [cart, dispatch] = useReducer(cartReducer, initialCart);
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
    const contextValue = {cart, dispatch};
    
    return (
      <CartContext.Provider value={contextValue}>
              {props.children}
      </CartContext.Provider>
    )

}

// We can declare a custom hook here to make it easier for the context to be consumed.

// BENEFITS:
// It will be easier to consume the context
// We can stop exporting the raw context so we can throw helpful errors if the provider is missing 

export function useCart() {
  // We will hold the value within a variable called context
  const context = useContext(CartContext);
  if(!context) {
    throw new Error("useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error.")
  }
  return context
}