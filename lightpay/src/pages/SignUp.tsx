import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import './SignUp.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const eye = <FontAwesomeIcon icon={faEye} />;

function RegisterUser() {
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const getEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getFullname = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const getMobile = (e: ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };

  const getPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const data = {
    email,
    fullname,
    mobile,
    password,
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/auth/register', data)
      .then((info) => {
        setSuccessMessage(info.data.message);
        setErrorMessage('');
        console.log(info.data.message);
      })
      .catch((err) => {
        let error = err.response.data;

        setErrorMessage(err.response.data);
        setSuccessMessage('');
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Sign up</h1>
        </div>

        <div className="form">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={getEmail} />

          <label htmlFor="fullname">fullname</label>
          <input type="text" value={fullname} onChange={getFullname} />

          <label htmlFor="mobile">mobile</label>
          <input type="text" value={mobile} onChange={getMobile} />

          <label htmlFor="password">Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            value={password}
            onChange={getPassword}
          />
          <i className="eye" onClick={togglePasswordVisiblity}>
            {eye}
          </i>

          <button type="submit">Sign Up</button>
          {errorMessage.length > 0 ? (
            <div className="error-msg"> {errorMessage} </div>
          ) : null}
          {successMessage.length > 0 ? (
            <div className="success-msg"> {successMessage} </div>
          ) : null}
        </div>
      </form>
    </>
  );
}

export default RegisterUser;
