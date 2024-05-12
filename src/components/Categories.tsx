import { useWhyDidYouUpdate } from "ahooks";
import React, { memo } from "react";
// import React, { useState } from "react";
//import pelmenis from "../assets/pelmenis.json";
//import PelmeniBlock from "./Pelmeni-Block";

// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "./redux/slices/counterSlice";

// типы для параметров категорий
type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void; // должны сказать что функция получит и что вернет
  // функция получает один аргумент i с типом числовым
  //void гласит о том, что функция вернет ничего undefined
  // void возвращает пустоту, по завершению определенных действий, которые выполняет функция
  // он никаких значений не возвращает
};
const categories = ["Все", "Мясные", "Вегетарианские", "Сладкие", "Напитки"];

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  // React.FC типизирует параметры с помощью ранее созданного типа (выше)
  // Функциональный компонент хранит в себе параметры - пропсы, в свою очередь придает тип объекта своим параметрам

  // console.log(value);

  // const [activeIndex, setActive] = useState(0);
  console.log("Произошел рендер в Категории");

  // В каком компоненте произошла перерисовка
  // первый аргумент сам компонент, второй - параметры компонента
  useWhyDidYouUpdate("Categories", { value, onClickCategory });

  // const onClickCategory = (index) => {
  //   setActive(index);
  // };

  // const value = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

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
};

export default memo(Categories);
