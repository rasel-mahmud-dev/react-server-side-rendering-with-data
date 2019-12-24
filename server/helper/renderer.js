import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { renderRoutes } from 'react-router-config'
import Routes from '../../src/Routes'


export default function(req, store){
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>
  );

  // send html without redux data.........
  return template(content, store)
};


function template(content, store){
  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="themes" content="#f43454">
      <title>Server Side Rendering</title>
      <link rel="stylesheet" href="static/css/index.css">
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.INITIAL_STATE = ${JSON.stringify(store.getState())}
      </script>
      <script src="static/js/bundle.js"></script>
    </body>
    </html>
  `;
}