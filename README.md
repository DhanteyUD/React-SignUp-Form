# React-SignUp-Form

Run `npm install` after clone to install all dependencies

1. `cd client` and run `npm start` on the terminal to start client server

2. `cd server` and split terminal into 4 :

   a. `npm run build` to transpile codes into javascript

   b. `npm run docker` to start docker

   c. `npm run db` to start database

   d. `npm run start` to start backend server

> Note:
>
> 1. Make sure docker hub is running
> 2. Install Postico as preferred postgreSQL GUI

---

1. Sign Up Frontend Form :

```js
import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import './SignUp.css';

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
```

2. Sign Up Backend Controller :

```js
import { Request, Response, NextFunction } from 'express';
import hashPassword from '../auth/encrypt';
import pool from '../db/connection';

// Register User
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const fullname = req.body.fullname;
  const mobile = req.body.mobile;
  const password = req.body.password;

  try {
    const hashedPassword = await hashPassword(password);
    console.log({
      email,
      fullname,
      mobile,
      password: hashedPassword,
    });

    let insertQuery = `INSERT into "Users"(email, fullname, mobile, password)
                        VALUES('${email}', '${fullname}', '${mobile}','${hashedPassword}')
    `;

    pool.query(insertQuery, (err: any, result: any) => {
      if (!err) {
        res.status(201).send({ message: 'Successful!' });
      } else {
        res.status(500).send({ message: 'User already exist with this email' });
      }
    });
  } catch (err) {
    next(err);
  }
};

export default registerUser;
```

3. Sign Up CSS :

```css
.form-header {
  margin-left: 45%;
}
.form {
  margin-top: 80px;
  width: 50%;
  height: 50%;
  margin-left: 28%;
}
label {
  margin-bottom: 10px;
  display: flex;
}
input {
  width: 80%;
  border: 2px solid #000;
  margin-bottom: 40px;
  padding: 10px;
}
button {
  width: 83%;
  padding: 10px;
  font-size: 18px;
}

@media only screen and (max-width: 600px) {
  .form-header {
    margin-left: 33%;
  }
  .form {
    margin-top: 20%;
    width: 50%;
    height: 50%;
    margin-left: 25%;
  }
  label {
    margin-bottom: 10px;
    display: flex;
  }
  input {
    border: 2px solid #000;
    margin-bottom: 40px;
    padding: 10px;
  }
  button {
    width: 90%;
    padding: 10px;
    font-size: 18px;
  }
}
```
