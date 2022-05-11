# React-SignUp-Form

1. **Install the backend express server:**

     `npm i express-generator-typescript`
    
2. **Install the frontend react client:**

      `npx create-react-app my-app --template typescript`
  
3. **Install axios and cors:**
 
      `npm i axios cors`
      
 ---

1. Sign Up Frontend Form :

```js
import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import './ResetPassword.css';

function RegisterUser() {
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

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
      .post('http://localhost:3000/auth/register', data)
      .then((info) => {
        console.log(info.data.message);
      })
      .catch((err) => {
        console.log(err.response.data);
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
          <input type="password" value={password} onChange={getPassword} />

          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default RegisterUser;

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
