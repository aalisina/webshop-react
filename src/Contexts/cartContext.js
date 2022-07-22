import React from "react";

// Possible to pass a default value as a parameter: React.createContext(param)
// The default value applies when a component tries to consume the context without being nested under
// a provider 
export const CartContext = React.createContext(null);