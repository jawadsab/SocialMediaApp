import React, { useState } from 'react';
import './SignupStyles.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const handleInputChange = (fieldName) => (event) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  const submitForm = (e) => {
      console.log(formData);
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
      </div>
    </div>
  );
};

export default Signup;
