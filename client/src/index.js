import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App";

import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
//SEGUN ESTE TRABAJANDO EN MI COMPU O DEPLOY
const APIURL=null;
axios.defaults.baseURL = process.env.APIURL || "http://localhost:3001";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
