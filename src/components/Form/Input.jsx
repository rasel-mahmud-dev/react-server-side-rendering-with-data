import React from 'react'
import './Input.css'

const Input = ({name, type='text', label, value, onClick, onBlur, onChange, placeholder, errors, tauched})=>{    
  return (
    <div className="input_group">
      <label 
        className={["label", errors && tauched ? "error_alert" : ""].join(" ")} 
        htmlFor={name}>{label}</label>
      <input 
        className={["input", 
          errors && errors[name] && tauched ? "input_error" : "",
          errors && !errors[name] && tauched ? "input_success" : ""
       ].join(" ")}
        name={name}
        type={type} 
        value={value}  
        placeholder={placeholder}  
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        />
    { errors && tauched ? (<div className="error_alert">{errors[name]}</div> ) : ''}
    </div>
  )
}


export default Input