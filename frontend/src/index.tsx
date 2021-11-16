import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./components/App";
import store from "./redux/store";

if(process.env.NODE_ENV !== "production"){
require('dotenv').config()
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
  rootElement
);
