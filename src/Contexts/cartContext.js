import React, { useReducer } from "react";
import cartReducer from "../Reducers/cartReducer";


// Possible to pass a default value as a parameter: React.createContext(param)
// The default value applies when a component tries to consume the context without being nested under
// a provider 
export const CartContext = React.createContext(null);

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
    return (<CartContext.Provider>{props.children}<CartContext.Provider/>)
}