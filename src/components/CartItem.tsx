import React from "react";
import { useDispatch } from "react-redux";

import plus from "../assets/img/plus.svg";
import minus from "../assets/img/minus.svg";
import {
  addCartValue,
  minusItemValue,
  removeCartValue,
} from "../redux/cartSlice/slicesCart";

import { CartItem as CartItemType } from "../redux/cartSlice/typeCarts";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  count: number;
  sizes: number;
  imageUrl: string;
  types: string;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  count,
  sizes,
  imageUrl,
  types,
}) => {
  const dispatch = useDispatch();
  // const notLink = (e) => {
  //   e.preventDefault();
  // };

  const removeId = () => {
    if (window.confirm("Вы действительно хотите удалить товар?")) {
      dispatch(removeCartValue(id));
    }
  };

  const plusItemClick = () => {
    dispatch(addCartValue({ id, sizes, types } as CartItemType));
  };
  const minusItemClick = () => {
    if (count - 1 < 1) {
      removeId();
    } else {
      dispatch(minusItemValue(id));
    }
  };
  const removeItemClick = () => {
    removeId();
  };

  return (
    <div className="cart__item">
      <div className="cart__item__left">
        <div className="cart__item__title">
          <h2>{name}</h2>
          <h4>
            {types}, {sizes}гр.
          </h4>
        </div>
        <div className="cart__item__img">
          <img width={200} src={imageUrl} alt="Pel"></img>
        </div>
      </div>
      <div className="cart__item__quantity">
        <img onClick={minusItemClick} width={20} src={minus} alt="minus" />
        {count}
        <img onClick={plusItemClick} width={20} src={plus} alt="plus" />
      </div>
      <div className="cart__item__price">
        {price * count} <b> ₽</b>
      </div>
      <div onClick={removeItemClick} className="cart__item__close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 
            12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 
            18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 
            5.63672L11.9997 10.5865Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default CartItem;
