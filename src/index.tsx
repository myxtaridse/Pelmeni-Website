import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

import "./index.css";
import App from "./App";
import { StrictMode } from "react";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Provider
          store={store} //содружество React с Redux Toolkit через Redux React
        >
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
}
//</React.StrictMode> - все было в этот тег оформлено - строгий режим для кода
