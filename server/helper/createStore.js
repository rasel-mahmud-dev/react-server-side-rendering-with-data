
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import Axios from "axios";

import reducers from "../../src/reducers";


export default (req)=>{

  //! only when page initial api call then apply it. mean,
  //- ( it only apply server side api call... )

  // when initial api call we need pass headers inside cookie and set target url.
  // cause initial api call axios dont't no our target url (backend api which u set by proxy). 
  // and also initial api call axios don't set by default cookie.

  // To Solution ==> (when page initial call api.  ==> only then apply it )
  // we create axios instance and set baseUrl and cookie 

  const axiosInstance = Axios.create({
    baseURL :"http://localhost:4001",
    headers: { "cookie": req.get("cookie") || '' }
  })

  const store = createStore(reducers, 
    {}, 
    applyMiddleware(reduxThunk.withExtraArgument(axiosInstance))
  );

  return store
}

/* Note: 
.   reduxThunk has a extra method ( withExtraArgument )
    we pass any data to call it 
    and we get this value from action when define dispatch action 
    like  ==> // (dispatch, getState, outData)=>{}
*/