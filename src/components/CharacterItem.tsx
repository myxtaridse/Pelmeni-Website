import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/itemsSlice/selectorsItems";

const CharacterItem: React.FC = () => {
  const { items } = useSelector(selectItems);

  // console.log(items);

  return (
    <div className="pizza-block__selector">
      {/* <ul>
        {types.map((type) => {
          return (
            <li
              key={type}
              className={activeType === type ? "active" : ""}
              onClick={() => setActiveType(type)}
            >
              {typesNames[type]}
            </li>
          );
        })}
      </ul>
      <ul>
        {sizes.map((size, i) => {
          return (
            <li
              key={size}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? "active" : ""}
            >
              {size} гр.
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default CharacterItem;
