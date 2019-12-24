import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from '../../actions/authAction'

import "./Navigation.css"

const Navigation = (props) => {
  return (
    <nav className="main_navigation">
      <ul className="main_nav">
          <li><NavLink exact to="/"> Home </NavLink></li>
          <li><NavLink to="/about"> About </NavLink></li>
          <li><NavLink to="/users"> Users </NavLink></li>
      </ul>
      <ul className="auth_nav">
        { props.auth.isAuthenticated
        ? (
          <React.Fragment>
            <li><NavLink to='/dashboard'>{props.auth.username}</NavLink></li>
            <li><a onClick={props.logout} >Logout</a></li>
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <li> <NavLink to="/login">Login</NavLink></li>
            <li> <NavLink to="/register">Register</NavLink></li>
          </React.Fragment>
        )}
        
      </ul>
    </nav>
  )
}

const mapStateToProps = (state)=>{
  return { auth: state.auth }
}

export default connect(mapStateToProps, { login, logout })(Navigation)