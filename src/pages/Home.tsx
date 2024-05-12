import React from "react";

import qs from "qs";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";

import {
  Categories,
  Sort,
  PelmeniBlock,
  Skeleton,
  Pagination,
} from "../components/index";
import { list } from "../components/Sort";

import NotFound from "./NotFound";

import {
  setCategoryId,
  setCurrentPage,
  setFilter,
} from "../redux/filterSlice/sliceFilter";
import { selectFilter } from "../redux/filterSlice/selectorsFilter";
import { fetchProducts } from "../redux/itemsSlice/asyncActions";
import { selectItems } from "../redux/itemsSlice/selectorsItems";
import { ProductsProps } from "../redux/itemsSlice/typeItems";

const Home: React.FC = () => {
  const navigate = useNavigate();
  //const [isLoading, setIsLoading] = React.useState(true);
  const { categoryId, currentPage, isSearch, sort } = useSelector(selectFilter); //c помощью данного хука можно вытащить стейт
  const sortProperty = sort.sortProperty;

  const { items, webStatus } = useSelector(selectItems);
  // useSelector - хранит в себе стейт

  const dispatch = useAppDispatch();
  // useDispatch - вбирает в себя id активной категории и передает state в reducer, в Slice идет изменение value - categoryId
  // Диспатч - функция

  // каждый раз когда идет перерисовка Home,
  //когда перерисовывается каждая функция внутри
  // а с каждой перерисовкой идет перерисовка ссылки в функции
  // но при useCallback не будет перерисовка функции, он сохранит ее в прежнем виде
  // она перерисуется лишь с первым рендером страницы [] - пустой
  // ссылка на функцию останется прежней, отсюда и сам компонент не будет каждый раз делать перерисовку
  // поскольку параметры (пропсы) остались прежнеми, не изменились
  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePageNumber = React.useCallback((number: number) => {
    dispatch(setCurrentPage(number));
  }, []);

  //отображение полного URL-адреса всегда, но не в первый рендер, поскольку
  //клиент сайта еще не задавал параметры сам
  const isMounted = React.useRef(false);

  // до того, как выполнится useEffect - заранее проверяем нужно ли делать поиск через URL
  const isAxios = React.useRef(false); // необходим один запрос
  //либо по умолчанию, либо по уже заданным ранее категориям - фильтрам

  const axiosProducts = async () => {
    //await - не умеет работать без async, то есть где он используется в главной функции, данная функция должна быть асинхронна
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortProperty.replace("-", "");
    const sortOrder = sortProperty.includes("-") ? "asc" : "desc";
    const search = isSearch ? `search=${isSearch}` : "";

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
      // диспатч принимает в себя лишь объекты, не понимает что за функция
      // не знает какие у него есть actions
      fetchProducts({
        category,
        sortBy,
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
        sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`); //выводится строчка с параметрами
    }
    isMounted.current = true;
    //первый раз, когда чел только зашел на сайт, будет false чтобы не прописались параметры в адресную строку,
    // в последующем будет true, что разрешит прописывать в адресную строку параметры
  }, [categoryId, sortProperty, currentPage]);

  //console.log(selectCart);

  React.useEffect(() => {
    //когда идет обновление страницы, параметры остаются
    //идет сохранение параметром в редуксе
    //при обновлении страницы, параметры выбранные ранее сохраняются
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as ProductsProps;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      // if (sort) {
      //   params.sortBy = sort;
      // }
      sort &&
        dispatch(
          setFilter({
            categoryId: Number(params.category),
            isSearch: params.search,
            currentPage: Number(params.currentPage),
            sort,
          })
        );
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

    //if (!isAxios.current) {
    //если не было запроса по уже ранее указанным параметрам
    //вызывается функция с параметрами по умолчанию
    axiosProducts();
    //}
    isAxios.current = false;
  }, [categoryId, sortProperty, isSearch, currentPage]); //при изменении данных элементов, запрос отправляется на бэк

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

  const products = items.map((obj: any) => (
    <Link key={obj.id} to={`product/${obj.id}`}>
      <PelmeniBlock value={obj} {...obj} />
    </Link>
  ));

  if (webStatus === "error") {
    return <NotFound />;
  }

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId} //начальное значение принимает ноль, затем отправляется в параметры компонента Category
          onClickCategory={onChangeCategory} //обновляется значение на id, кликнутого элемента
        />
        <Sort value={sort} />
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

//searchValue == isSearch
