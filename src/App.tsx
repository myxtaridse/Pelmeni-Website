import React from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import "./scss/app.scss";

import { Loading } from "./components/index";
import Home from "./pages/Home";
//import NoName from "./pages/NotFound";
//import Cart from "./pages/Cart";
// import Product from "./pages/Product";
import MainLayout from "./layouts/MainLayout";

// ленивая подгрузка, подгрузит файл страницы только тогда, когда это будет необходимо
// если компонент Cart отрендерится
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const Product = React.lazy(
  () => import(/* webpackChunkName: "Product" */ "./pages/Product")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
// export const SearchContext = React.createContext();

const App: React.FC = () => {
  // state сделали с помощью redux
  //const [searchValue, setSearchValue] = React.useState("");
  //связка Search-компонента в Header c PelmeniBlock в Home
  //поиск по названию товаров
  return (
    // <div className="wrapper">
    //   {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
    //   <Header />
    //   <div className="content">
    //     <div className="container">
    //       <Routes>
    //         <Route
    //           path="/"
    //           element={
    //             <Home
    //             // searchValue={searchValue}
    //             // setSearchValue={setSearchValue}
    //             />
    //           }
    //         ></Route>
    //         <Route path="cart" element={<Cart />}></Route>
    //         <Route path="*" element={<NoName />}></Route>
    //         <Route path="product/:id" element={<Product />}></Route>
    //       </Routes>
    //     </div>
    //   </div>
    //   {/* </SearchContext.Provider> */}
    // </div>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<Loading />}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<Loading />}>
              <NotFound />
            </React.Suspense>
          }
        />
        <Route
          path="product/:id"
          element={
            <React.Suspense fallback={<Loading />}>
              <Product />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;

//555
