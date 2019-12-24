import React from 'react'
import UsersListPage from './pages/UsersListPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

import DashboardPage from './pages/DashboardPage'

import App from './App'

const routes = [
  {
    ...App,
    routes:[
      {
        ...HomePage ,
        path: "/",
        exact: true,
      },
      {
        ...DashboardPage ,
        path: "/dashboard",
      },
      {
        component: AboutPage,
        path: "/about",
      },
      {
        ...UsersListPage ,
        path: "/users"
      },
      {
        ...LoginPage ,
        path: "/login"
      },
      {
        ...RegisterPage ,
        path: "/register"
      },
    ]
  }
]



export default routes;


// NOTE:: here page == { component: PageName, loadData: function }

