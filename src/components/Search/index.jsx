import React from "react";
import { SearchContext } from "../../App";

import searchLogo from "../../assets/img/search-line.svg";
import style from "./Search.module.scss";
import debounce from "lodash.debounce";
// import debounce from "lodash.debounce";

// const debounceTimeOut = debounce(() => {
//   //данный способ оптимизурует работу сайта,
//   //чтобы не было с каждой буквы запрос на бэк
//   console.log("vbhcasd");
// }, 1000);

function Search() {
  const [value, setValue] = React.useState(""); //отвечает за изображение из инпута значения
  const { setSearchValue } = React.useContext(SearchContext); //делает поиск, выводит запрос в бэк для поиска определенного товара

  const inputRef = React.useRef();
  const onClickClear = () => {
    setSearchValue("");
    setValue(""); //приводит инпут в пустую строку, стерает все
    //document.querySelector("input").focus();

    //оставляет фокус на инпуте, даже когда нажали крестик, чтоюы потом
    // можно было продолжить печатать без наведения мыши на инпут
    //но это js способ, что критично, поэтому в обращении к ссылкам DOM-элементов
    //лучше использовать хук useRef
    inputRef.current.focus();
    //оставляет фокус на инпуте, даже когда нажали крестик, чтоюы потом
    //console.log(inputRef.current); //current возвращает ссылку на элемент, к которой прикрепляется действие, т.о. .focus
  };

  //сокращение запросов на бэк, когда ввел хотя бы все словр не 1, за секунду
  //что не перегружает работу сайта
  //из-за множество запросов бэк, откуда берем товары, может заблочить, поскольку перегруз

  const updateSearch = React.useCallback(
    //вызывает функцию, при изменении состояния, и возварщает ее
    debounce((str) => {
      setSearchValue(str); //совершает отложенное выполнение функции, через секунду
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value); //вкладываем значение введенное в инпут
    updateSearch(event.target.value); //вкладываем значение введенное в инпут для функции, которая совершит запрос через 1 сек
  };

  return (
    <div className={style.search}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder="Поиск..."
      />
      <img src={searchLogo} alt="Search Logo" />

      {value && (
        <svg
          onClick={onClickClear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="grey"
        >
          <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
        </svg>
      )}
    </div>
  );
}

export default Search;
