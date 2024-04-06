import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider
        store={store} //содружество React с Redux Toolkit через Redux React
      >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
