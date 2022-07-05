export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];

    default:
      throw new Error("Unhandled action" + action.type);

    case "add":
      const { id, sku } = action;
      const itemAlreadyInCart = cart.find((item) => item.sku === sku);
      // if(itemAlreadyInCart) cart.quantity++; Doesn't work, need to treat state as immutable
      if (itemAlreadyInCart) {
        // Return a new array with the matching item replaced
        return cart.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Return a new array with the new item attached to it
        return [...cart, { id, sku, quantity: 1 }];
      }
    case "updateQuantity": {
      const { sku, quantity } = action;
      if (quantity === 0) {
        return cart.filter((item) => item.sku !== sku);
      }
      return cart.map((item) =>
        item.sku === sku ? { ...item, quantity } : item
      );
    }
  }
}
