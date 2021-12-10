import React, { useState } from 'react';
import { Navigate } from 'react-router';

import './SigninStyles.css';

import { signin } from '../../api/auth/api-auth';
import { authenticate } from '../../helper/auth-helper';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    success: false,
    message: '',
    field: '',
  });

  const { email, password, success, message, field } = formData;

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
      message: '',
      field: '',
    });
  };

  const submitForm = (e) => {
    const { email, password } = formData;
    signin({ email, password })
      .then((res) => {
        const { success, msg, token,user } = res;
        authenticate({token,id:user._id}, () => {
          setFormData({
            ...formData,
            email: '',
            password: '',
            success,
            message: msg,
          });
        });
      })
      .catch((err) => {
        const { success, msg, field } = err.response.data;
        setFormData({
          ...formData,
          success,
          message: msg,
          field,
        });
      });
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
    <div className="signin-page">
      <div className="signin-container">
        <h2>Signin</h2>
        <div className="field">
          <label className="field-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className={field === 'email' ? 'input-error' : ''}
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
            className={field === 'password' ? 'input-error' : ''}
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
      {success && <Navigate to="/" />}
    </div>
  );
};

export default Signin;
