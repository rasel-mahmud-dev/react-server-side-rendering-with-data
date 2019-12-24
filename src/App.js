import React from 'react'
import { renderRoutes } from 'react-router-config'

import { connect } from 'react-redux'
import { fetchCurrentUser } from './actions/authAction'

import Navigation from './components/Navigation/Navigation'
import "./style.css";

class App extends React.Component{
  componentDidMount() {
    this.props.fetchCurrentUser()    
  }
  render(){        
    return(
      <div className="App">
      <header className="header">
        <div className="container"><Navigation/></div>
      </header>
      { renderRoutes(this.props.route.routes) }
      </div>
    )
  }
}

function loadData(store){    
  return store.dispatch(fetchCurrentUser()) 
}

export default {
  component: connect(null, { fetchCurrentUser })(App),
  loadData: loadData
}
