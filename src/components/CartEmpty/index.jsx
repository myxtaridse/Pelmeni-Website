import React from "react";
import { Link } from "react-router-dom";
import style from "./CartEmpty.module.scss";

const CartEmpty = () => {
  return (
    <div className={style.root}>
      <h2>Тарелка пуста</h2>
      <h3>
        Для того, чтобы заказать блюдо, необходимо перейти на главную страницу
      </h3>
      <img
        width={400}
        src="http://png.pngtree.com/png-clipart/20220621/original/pngtree-vector-artistic-illustration-or-drawing-of-empty-plate-png-image_8168056.png"
      />
      <Link to="/">
        <button>Перезагрузить страницу</button>
      </Link>
    </div>
  );
};

export default CartEmpty;
