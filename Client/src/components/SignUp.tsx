import axios from 'axios';
import React, { useState } from 'react';
import './SignUp.css';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {signup} from '../models/signp.model'
const eye = <FontAwesomeIcon icon={faEye} />;

function RegisterUser() {
  const [profile, setProfile] = useState(signup);
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  function refreshPage() {
    window.location.reload();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {name, value} = e.target;
    setProfile((prev) => ({...prev, [name]: value}));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await axios.post('http://localhost:5000/auth/register', {
        email: profile.email,
        fullname: profile.fullname,
        mobile: profile.mobile,
        password: profile.password
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setProfile(signup);
      console.log(response.data.message);
    } catch (err: any) {
      let error = err.response.data;

      setErrorMessage(err.response.data);
      setSuccessMessage('');
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Sign up</h1>
        </div>

        <div className="form">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} />

          <label htmlFor="fullname">fullname</label>
          <input type="text" name="fullname" value={profile.fullname} onChange={handleChange} />

          <label htmlFor="mobile">mobile</label>
          <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
          <i className="eye" onClick={togglePasswordVisiblity}>
            {eye}
          </i>

          <button type="submit">Sign Up</button>
          {errorMessage.length > 0 ? (
            <div className="error-msg"> {errorMessage} </div>
          ) : null}
          {successMessage.length > 0 ? (
            <div className="success-msg">
              {' '}
              <FontAwesomeIcon
                className="check-icon"
                icon={solid('circle-check')}
              />
              {successMessage}{' '}
              <button onClick={refreshPage} className="refresh">
                Refresh form
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
}

export default RegisterUser;
