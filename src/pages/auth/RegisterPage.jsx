
import React from "react";
import { connect  } from 'react-redux'
import  { register } from '../../actions/authAction'

import Input from "../../components/Form/Input";


class RegisterPage extends React.Component {
  state = {
    data: {
      email: { value: "", tauched: false },
      username: { value: "", tauched: false },
      password: { value: "", tauched: false },
    },
    errors: null,
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  validateChange = (e)=>{
    const errors = {}

    if([e.target.name] == 'email'){
      if(e.target.value == ''){
         errors.email = "Not Allowed Empty" 
      }
      else if(e.target.value.length <= 2){        
        errors.email = "Email Length must be greater than 3 Character"
      }
      else{
        errors.email = ''
      }
    }
    if([e.target.name] == 'username'){
      if(e.target.value == ''){
         errors.username = "Not Allowed Empty username" 
      }
      else if(e.target.value.length <= 2){        
        errors.username = "username Length must be greater than 3 Character"
      }
      else{
        errors.username = ''
      }
    }

    if([e.target.name] == 'password'){
      if(e.target.value == ''){
         errors.password = "Not Allowed Empty Password" 
      }
      else if(e.target.value.length <= 2){        
        errors.password = "Password Length must be greater than 3 Character"
      }
      else{
        errors.password = ''
      }
    }
    return Object.keys(errors).length ? errors : null
  }

  handleClick=(e)=>{
    let errors = this.validateChange(e)     
    this.setState({
      ...this.state,
      errors: {...this.state.errors, ...errors },
      data: { 
        ...this.state.data,
        [e.target.name] : { ...this.state.data[e.target.name], tauched: true }
      }     
    })
  }


  handleChange = e => {  
    let errors = this.validateChange(e) 

    this.setState({
      ...this.state,
      errors: {...this.state.errors, ...errors },
      data: { 
        ...this.state.data,
        [e.target.name] : { ...this.state.data[e.target.name], value: e.target.value, tauched: true }
      }     
    });
  };

  handleBlur=(e)=>{
    this.setState({
      ...this.state,
      data: { 
        ...this.state.data,
        [e.target.name]: { ...this.state.data[e.target.name], tauched: true }
      }
    })
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    const userData = {
      email: this.state.data.email.value,
      username: this.state.data.username.value,
      password: this.state.data.password.value
    }
    this.props.register(userData, this.props.history)
  } 


  render() {    
    console.log(this.state.errors);
    
    return (
      <div className="form_container">
        <h2>Register Here.............</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Email"
            name="email"
            value={this.state.data.email.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
            placeholder="Enter Your Email"
            errors={this.state.errors}
            tauched={this.state.data['email'].tauched}
          />
          <Input
            label="Username"
            name="username"
            value={this.state.data.username.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
            placeholder="Enter Your Username"
            errors={this.state.errors}
            tauched={this.state.data['username'].tauched}
          />
          <Input
            label="Password"
            name="password"
            value={this.state.data.password.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
            placeholder="Enter Your Password"
            errors={this.state.errors}
            tauched={this.state.data['password'].tauched}
          />

          <button type="Submit">Register</button>
        </form>
      </div>
    );
  }
}

export default {
  component: connect(null, { register })(RegisterPage)
  };
