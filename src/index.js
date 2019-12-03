import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import store from "./redux/store";

const root = document.querySelector("#root");

// Cool to see the React/Redux setup!
const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, root);
