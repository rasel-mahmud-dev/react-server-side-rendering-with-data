import React, { Component } from "react"
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/usersAction'


class UsersList extends Component{
  componentDidMount() {    
    this.props.fetchUsers()
  }

  renderUsers = ()=>{
    return this.props.users.map(user=>{
      return (
        <ul key={user._id}>
          <li>{user.username}</li>
        </ul>
      )
    })
  }

  render(){    
    return(
      <div>
        <h1>User List</h1>
        { this.renderUsers() }
      </div>
    )
  }
}

const mapToStateProps = (state)=>{
  return { users: state.users }
}

//? Why ==> LoadData Function ?
// we call frist time before server send html.
// cause: we need all users Data, and we send from (html+user data) both.
// client site js recieved this data (user data), and pass redux initial State.
const loadData =(store)=>{
  return store.dispatch(fetchUsers())
}

export default {
  component: connect(mapToStateProps, { fetchUsers })(UsersList),
  loadData: loadData
}
