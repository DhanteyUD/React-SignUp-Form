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

    let insertQuery = `INSERT into "Users"(email, fullname, mobile, password, "createdAt", "updatedAt")
                        VALUES('${email}', '${fullname}', '${mobile}','${hashedPassword}', (to_timestamp(${Date.now()} / 1000.0)), (to_timestamp(${Date.now()} / 1000.0)))
    `;

    pool.query(insertQuery, (err: any, result: any) => {
      if (!err) {
        res.status(201).json({
          message: 'Registration successful, please check your email to verify',
        });
      } else {
        res.status(500).send('User already exist with this email');
      }
    });
  } catch (err) {
    next(err);
  }
};

export default registerUser;
