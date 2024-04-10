import React from "react";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import NoName from "./NotFound";

import { list } from "../components/Sort";
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
import { fetchProducts } from "../redux/slices/itemsSlice";

const Home = ({ searchValue }) => {
  const navigate = useNavigate();
  //const [isLoading, setIsLoading] = React.useState(true);
  const { categoryId, currentPage } = useSelector((state) => state.filterSlice); //c помощью данного хука можно вытащить стейт
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);

  const { items, webStatus } = useSelector((state) => state.itemsSlice);
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

  //отображение полного URL-адреса всегда, но не в первый рендер, поскольку
  //клиент сайта еще не задавал параметры сам
  const isMounted = React.useRef(false);

  // до того, как выполнится useEffect - заранее проверяем нужно ли делать поиск через URL
  const isAxios = React.useRef(false); // необходим один запрос
  //либо по умолчанию, либо по уже заданным ранее категориям - фильтрам

  const axiosProducts = () => {
    //await - не умеет работать без async, то есть где он используется в главной функции, данная функция должна быть асинхронна
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sort = sortType.replace("-", "");
    const sortOrder = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    // await Axios.get(
    //   //await - превращает функцию в синхронный код, чтобы вначале выполнился fetch-запрос
    //   // а потом остальное - скроллинг, завершение лоадинга
    //   `https://66028e549d7276a755538691.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${sortOrder}&${search}`
    // ).then((res) => {
    //   dispatch(setItems(res.data));
    //   dispatch(setIsLoading(false));
    //   console.log("раньше"); //синхронный запрос - по очереди
    // });

    // Отлавливание ошибок с бэка и в самом JS-коде. Функция применяемая JS
    // try {
    //   //можно сократить код-запрос
    //   // const res = await Axios.get(
    //   //   `https://66028e549d7276a755538691.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${sortOrder}&${search}`
    //   // );
    //   dispatch(
    //     fetchProducts({
    //       category,
    //       sort,
    //       sortOrder,
    //       search,
    //       currentPage,
    //     })
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    //убрали try, catch и finally поскольку теперь все состояния в redux

    //finally {
    //работает и при удачном выполнении запроса и при ошибке
    // и там и там нам необходимо отключить скелетон
    //setIsLoading(false);
    //}

    dispatch(
      fetchProducts({
        category,
        sort,
        sortOrder,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  //const [items, setItems] = React.useState([]);

  // const [categoryId, setCategoryId] = React.useState(0);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating", //изначальные данные, sortProperty - для бэка к запросу, искать по цене, рейтингу, наименованию
  // });
  // const [currentPage, setCurrentPage] = React.useState(1);

  //вшивание параметров в адресную строчку URL
  //если пришли какие-то параемтры, должны превратить в одну целую строчку
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`); //выводится строчка с параметрами
    }
    isMounted.current = true;
    //первый раз, когда чел только зашел на сайт, будет false чтобы не прописались параметры в адресную строку,
    // в последующем будет true, что разрешит прописывать в адресную строку параметры
  }, [categoryId, sortType, currentPage]);

  React.useEffect(() => {
    //когда идет обновление страницы, параметры остаются
    //идет сохранение параметром в редуксе
    //при обновлении страницы, параметры выбранные ранее сохраняются
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);
      dispatch(setFilter({ ...params, sort }));
      isAxios.current = true; //если был диспатч с новыми изменениями, тогда идет запрос с URL уже с обновленными параметрами
    }
  }, []);

  React.useEffect(() => {
    //setIsLoading(true);
    // const category = categoryId > 0 ? `category=${categoryId}` : "";
    // //если выбранная категория не "Все" - добавляется номер категории от 1 до n - categories.length
    // const sort = sortType.replace("-", ""); //удаляет минус, чтобы не было ошибки
    // const sortOrder = sortType.includes("-") ? "asc" : "desc"; //проверяет наличие минуса, чтобы выбрать
    // const search = searchValue ? `search=${searchValue}` : ""; //вводимое слово если есть в инпуте, тогда поиск в запросе по наименованию

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

    // Axios.get(
    //   `https://66028e549d7276a755538691.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${sortOrder}&${search}`
    // ).then((res) => {
    //   dispatch(setItems(res.data));
    //   dispatch(setIsLoading(false));
    // });

    if (!isAxios.current) {
      //если не было запроса по уже ранее указанным параметрам
      //вызывается функция с параметрами по умолчанию
      axiosProducts();
    }
    isAxios.current = false;
  }, [categoryId, sortType, searchValue, currentPage]); //при изменении данных элементов, запрос отправляется на бэк

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

  if (webStatus === "error") {
    return <NoName />;
  }

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
      <div className="content__items">
        {webStatus === "loading" ? skelets : products}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePageNumber} //передается индекс выбранной страницы,
        //передается значению currentPage, который вставляется в запрос page={currentPage}
      />
    </>
  );
};

export default Home;
