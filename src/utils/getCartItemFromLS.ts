import { CartItem } from "../redux/cartSlice/typeCarts";

import { priceValue } from "./priceValue";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = priceValue(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
