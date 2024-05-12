import React, { memo } from "react";
import { useDispatch } from "react-redux";

import { setSortType } from "../redux/filterSlice/sliceFilter";
import { SortPropertyProps, SortProps } from "../redux/filterSlice/typeFilter";

export type SortListItem = {
  name: string;
  sortProperty: SortPropertyProps;
};

export const list: SortListItem[] = [
  { name: "популярности ↓", sortProperty: SortPropertyProps.RATING_DESC },
  { name: "популярности ↑", sortProperty: SortPropertyProps.RATING_ASC },
  { name: "цене ↓", sortProperty: SortPropertyProps.PRICE_DESC },
  { name: "цене ↑", sortProperty: SortPropertyProps.PRICE_ASC },
  { name: "алфавиту ↓", sortProperty: SortPropertyProps.NAME_DESC },
  { name: "алфавиту ↑", sortProperty: SortPropertyProps.NAME_ASC },
];

type SortComponentProps = {
  value: SortProps;
};

const Sort: React.FC<SortComponentProps> = ({ value }) => {
  const sortRef = React.useRef<HTMLDivElement>(null); //нужна ссылка на sort-элемент
  //чтобы когда вне popup кликаем на поле, закрывалось окно
  // В начальном значении useRef ничего нет, пишем null,
  // поскольку мы не знаем пока что там будет

  const [open, setOpen] = React.useState(false); //изначально окно закрыто
  console.log("Произошел рендер в Сортировке");

  const dispatch = useDispatch();

  const onClickListItem = (obj: SortProps) => {
    dispatch(setSortType(obj)); //вытаскивает id

    setOpen(false); //чтобы при выборе сортировочного компонента, закрывалось окно
  };

  React.useEffect(() => {
    //sortmount - рендер страницы
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
        //console.log("закрыто");
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    // Когда ухожу со страницы слушатель удаляется, дабы не работал на другой странице - sortunmount
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => setOpen(!open)} //проверяет open - когда показывает, тогда !open - не open
        >
          {value.name}
        </span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => {
              return (
                <li
                  key={i}
                  className={
                    value.sortProperty === obj.sortProperty ? "active" : ""
                  }
                  onClick={() => onClickListItem(obj)} //вытаскивает объект, у которого потом вытягивают id
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(Sort);
