import React, { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignupStyles.css';

import { create } from '../../api/user/api-user';

const SuccessMessge = () => {
  return <span>You can now signin in here</span>;
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    success: false,
    message: '',
    field: '',
  });
  const { name, email, password, success, message, field } = formData;

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
      message: '',
      field: '',
    });
  };

  const submitForm = (e) => {
    const { name, email, password } = formData;
    create({ name, email, password })
      .then((res) => {
        const { success, msg } = res.data;
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
        const { success, msg, field } = err.response.data;
        console.log(field);
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

  const notify = () => {
    toast.success(<SuccessMessge />, { autoClose: false });
  };

  return (
    <div className="signup-page">
      {success && notify()}
      <ToastContainer transition={Slide} />
      <div className="signup-container">
        <h2>Register</h2>
        <div className="field">
          <label className="field-label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className={field === 'name' ? 'input-error' : ''}
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
    </div>
  );
};

export default Signup;
