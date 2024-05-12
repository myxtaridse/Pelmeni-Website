import { CartItem } from "../redux/cartSlice/typeCarts";

export const priceValue = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
