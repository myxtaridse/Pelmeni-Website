import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import LogoSvgRed from "../assets/img/logo-red.svg";
import LogoTextSvgRed from "../assets/img/logo-text-red.svg";
import LogoSvgWhite from "../assets/img/logo-white.svg";
import LogoTextSvgWhite from "../assets/img/logo-text-white.svg";
import MenuToggle from "../assets/img/menu.svg";
import MenuClose from "../assets/img/close-circle-fill.svg";
import Search from "./Search";
import { selectCart } from "../redux/cartSlice/selectorsCart";
import { getCartFromLS } from "../utils/getCartItemFromLS";
// import HeaderNav from "./Header/HeaderNav";

//import Categories from "./Categories";

function Header() {
  const [toggle, setToggle] = useState(false);
  const isMountedRef = React.useRef(false);

  const toggleOnClick = () => {
    setToggle(!toggle);
  };

  const { items, totalPrice } = useSelector(selectCart);
  //const totalPrice = useSelector((state) => state.cartSlice.totalPrice);

  React.useEffect(() => {
    if (isMountedRef.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMountedRef.current = true;
  }, [items]);

  //высчитывает кол-во продуктов в корзину
  const sumItemCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  const location = useLocation();
  //console.log(location, window.location);

  getCartFromLS();

  return (
    <div className="header">
      <div className="container--high">
        <div
          onClick={() => toggleOnClick()}
          className="header__toggle active--toggle"
        >
          <img src={MenuToggle} className="header__menu" alt="Menu logo"></img>
        </div>
        <div className={toggle ? "container open" : "container"}>
          <div className="header__left">
            <Link to="/">
              <div className="header__logo__red">
                <img
                  src={LogoSvgRed}
                  alt="Pelmeni logo"
                  className="logo__red"
                />
                <img
                  src={LogoTextSvgRed}
                  alt="Pelmeni logo"
                  className="logo__red__text"
                />
              </div>
              <div className="header__logo__white">
                <img width="100" src={LogoSvgWhite} alt="Pelmeni logo" />
                <img width="200" src={LogoTextSvgWhite} alt="Pelmeni logo" />
              </div>
            </Link>
            <div className="header__navigation">
              <ul className="header__navigation">
                <li>
                  <Link to="/">Меню</Link>
                </li>
                <li>
                  <Link to="/">О нас</Link>
                </li>
                <li>
                  <Link to="/">Отзывы</Link>
                </li>
                <li>
                  <Link to="/">Контакты</Link>
                </li>
              </ul>
            </div>
            <div onClick={() => toggleOnClick()} className="header__close">
              <img
                src={MenuClose}
                className="header__close"
                alt="Close logo"
              ></img>
            </div>
          </div>
        </div>
        <Search />
        {location.pathname !== "/cart" && (
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{sumItemCount}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
