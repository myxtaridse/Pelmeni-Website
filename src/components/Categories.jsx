// import React, { useState } from "react";
//import pelmenis from "../assets/pelmenis.json";
//import PelmeniBlock from "./Pelmeni-Block";

function Categories({ value, onClickCategory }) {
  // console.log(value);

  // const [activeIndex, setActive] = useState(0);
  const categories = ["Все", "Мясные", "Вегетарианские", "Сладкие", "Напитки"];

  // const onClickCategory = (index) => {
  //   setActive(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li
              key={i}
              onClick={() => onClickCategory(i)} //вытягивается индекс из кликнутого элемента, направляется в Home
              className={value === i ? "active" : ""} //сравнивается выбранное нами значение и индекс выбранного элемента
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
