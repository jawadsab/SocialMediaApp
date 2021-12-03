import React, { useState } from 'react';
import './SignupStyles.css';

import api from '../../api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    success: false,
    message: '',
    field:''
  });
  const { name, email, password, success, message,field} = formData;

  const handleInputChange = (fieldName) => (event) => {
    setFormData({ ...formData, [fieldName]: event.target.value,message:"",field:"" });
  };

  const submitForm = (e) => {
    createUser(formData)
      .then((response) => {
        const { success, msg } = response.data;
        console.log(response);
        setFormData({
          ...formData,
          name: '',
          email: '',
          password: '',
          success,
          message: msg,
        });
      })
      .catch((err) => {
        const { success, msg,field } = err.response.data;
        console.log(field);
        setFormData({
          ...formData,
          success,
          message: msg,
          field
        });
      });
  };

  const createUser = async (formData) => {
    const response = await api.post('/api/users', formData);
    return response;
  };

  const messageContainer = () => {
    if (message) {
      if (success) {
        return <div className="success message-container">{message}</div>;
      } else {
        return <div className="error message-container">{message}</div>;
      }
    } else {
      return null;
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Register</h2>
        <div className="field">
          <label className="field-label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            name="name"
            id="name"
            value={name}
            onChange={handleInputChange('name')}
          />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className={field === "email" ? "input-error":""}
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange('email')}
          />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="name">
            Password:
          </label>
          <input
            type="text"
            className={field === "password" ? "input-error":""}
            placeholder="Enter password"
            name="password"
            id="password"
            value={password}
            onChange={handleInputChange('password')}
          />
        </div>

        <button onClick={submitForm} className="register-btn">
          Submit
        </button>
        {messageContainer()}
      </div>
    </div>
  );
};

export default Signup;
