import React from "react";
import Axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { listSort } from "../components/Sort";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PelmeniBlock from "../components/Pelmeni-Block";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilter,
} from "../redux/slices/filterSlice";
import { setItems, setIsLoading } from "../redux/slices/itemsSlice";

const Home = ({ searchValue }) => {
  const navigate = useNavigate();

  const categoryId = useSelector((state) => state.filterSlice.categoryId); //c помощью данного хука можно вытащить стейт
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);

  const items = useSelector((state) => state.itemsSlice.items);
  const isLoading = useSelector((state) => state.itemsSlice.isLoading);

  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  // useSelector - хранит в себе стейт

  const dispatch = useDispatch();
  // useDispatch - вбирает в себя id активной категории и передает state в reducer, в Slice идет изменение value - categoryId
  // Диспатч - функция

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePageNumber = (number) => {
    dispatch(setCurrentPage(number));
  };

  //const [items, setItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  // const [categoryId, setCategoryId] = React.useState(0);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating", //изначальные данные, sortProperty - для бэка к запросу, искать по цене, рейтингу, наименованию
  // });
  // const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      const sort = listSort.find((obj) => obj.sortProperty === params.sortType);
      dispatch(setFilter({ ...params, sort }));
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    //если выбранная категория не "Все" - добавляется номер категории от 1 до n - categories.length
    const sort = sortType.replace("-", ""); //удаляет минус, чтобы не было ошибки
    const sortOrder = sortType.includes("-") ? "asc" : "desc"; //проверяет наличие минуса, чтобы выбрать
    const search = searchValue ? `search=${searchValue}` : ""; //вводимое слово если есть в инпуте, тогда поиск в запросе по наименованию

    // fetch(
    //   `https://66028e549d7276a755538691.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${sortOrder}&${search}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((arr) => {
    //     dispatch(setItems(arr));
    //     dispatch(setIsLoading(false)); //два действия нужны - это асинхронная функция, пока рендерятся пиццы, выставляется set(false)
    //   });

    Axios.get(
      `https://66028e549d7276a755538691.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${sortOrder}&${search}`
    ).then((res) => {
      dispatch(setItems(res.data));
      dispatch(setIsLoading(false));
    });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]); //при изменении данных элементов, запрос отправляется на бэк

  //вшивание параметров в адресную строчку URL
  //если пришли какие-то параемтры, должны превратить в одну целую строчку
  React.useEffect(() => {
    const queryString = qs.stringify({
      sortType,
      categoryId,
      currentPage,
    });
    console.log(queryString); //выводится строчка с параметрами
    navigate(`?${queryString}`);
  }, [categoryId, sortType, currentPage]);

  const skelets = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  // const products = items
  //   .filter((obj) => {
  //     if (obj.name.toLowerCase().includes(searchValue)) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((obj) => <PelmeniBlock key={obj.id} {...obj} />); //данный вариант статичен, подходит для неизмененных товаров
  //и когда их немного, а так лучше в запросе поиск по наименованию

  const products = items.map((obj) => <PelmeniBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId} //начальное значение принимает ноль, затем отправляется в параметры компонента Category
          onClickCategory={onChangeCategory} //обновляется значение на id, кликнутого элемента
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пельмени</h2>
      <div className="content__items">{isLoading ? skelets : products}</div>
      <Pagination
        onChangePage={onChangePageNumber} //передается индекс выбранной страницы,
        //передается значению currentPage, который вставляется в запрос page={currentPage}
      />
    </>
  );
};

export default Home;
