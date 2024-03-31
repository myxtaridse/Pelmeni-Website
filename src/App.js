import React from "react";
// import "./App.css";
import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Home from "./pages/Home";
import NoName from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  //связка Search-компонента в Header c PelmeniBlock в Home
  //поиск по названию товаров
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            ></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="*" element={<NoName />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

//555
