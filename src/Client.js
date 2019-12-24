import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import Axios from "axios";
import { renderRoutes } from 'react-router-config'

import Routes from "./Routes";
import reducers from "./reducers";


// client side axiso instance  ( it only apply browser side api call... )
// we don't pass manually headers, cookie cause we set backend proxy api. axios autometics set it
// So, we define only baseURL ==> which we set route in backend proxy api

// and pass redux thunk withExtraArgument method as a parameter.
// which we get from our dispatch function like (dispatch, getState, ourData)=>{}

const axiosInstance = Axios.create({
  baseURL: "/api",
})


// Here....  window.INITIAL_STATE which send server
// we get redux pre loaded data which produce server with html
// and we use this data to fill our client side redux store.....

const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers, 
  window.INITIAL_STATE, 
  composeEnhanchers(applyMiddleware(reduxThunk.withExtraArgument(axiosInstance)))
);


ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(Routes)}
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);


if (module.hot) {
  module.hot.accept();
}

// if (module.hot) {
//   module.hot.accept("./App", () => {
//     ReactDOM.hydrate(<App />, document.getElementById("root"));
//   });
// }
