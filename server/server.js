import express from "express"
import expressHttpProxy from "express-http-proxy";
import httpProxyMiddleware from "http-proxy-middleware";


// react SSR staff.......
import { matchRoutes } from 'react-router-config'
import renderer from './helper/renderer'
import createStore from './helper/createStore'

// client Side Root App ( Virtual Dom )
import Routes from '../src/Routes'


const server = express()
server.use(express.static("build"));


// connect our backend-rest-api via proxy........
server.use('/api', expressHttpProxy('http://localhost:4001', {
  proxyReqOptDecorator(opts){
    opts.headers['x-forwarded-host'] = 'localhost:4000'
    return opts
  }
}))

// For Dev Tools
// Get Live Client bundle js and css file from 3000 port using proxy server......
server.use(["/static", "/sockjs-node"], httpProxyMiddleware({
    target: `http://localhost:3000`,
    ws: true,
    logLevel: "error",
    changeOrigin: true
  })
);



// express give responsible any route to react router. 
server.get("*", (req, res) => {  

  const store = createStore(req)

  // NOTE: Problem. We need essential data to page render from server.
  // 1. So. we need api call before server send html.
  // 2. Here, we call loadData function which (make api call) and get data.
  // 3. finaly server side redux store fill via his essential data.
  // 4. and server send ( html + data ) + server side redux store  

  //  matchRoutes <== pull client-site route each object (which you define as a Array)
  //  we recieved (loadData) function. which is set route object. and it comming every page.
  const promises = matchRoutes(Routes, req.path).map(({route})=>{
    return route.loadData ? route.loadData(store) : null
  })


  // wait server render html.... (cause we need also data)
  Promise.all(promises).then(()=>{
    const content = renderer(req, store);
    
    // now server side redux store is full fill via data.....
    // (cause.. here loadData function execute finished)
    // and now send response html + data + and (server side redux store )
    res.send(content)
  })

});

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>console.log(`server is running on http://localhost:${PORT}`))
