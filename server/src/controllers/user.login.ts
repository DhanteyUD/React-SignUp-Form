import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import pool from '../db/connection';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

// pool.connect();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const query = `SELECT id,mobile,email FROM "Users" WHERE email='${email}' AND password='${password}'`;

  pool.query(query, (err: any, result: any) => {
    if (!err) {
      if (!result.rows[0]) return res.json({ msg: 'user does not exist' });
      const { id, email, mobile } = result.rows[0];
      const user = { id, email, mobile };

      const user_secret = process.env.SECRET as string;
      const token = jwt.sign(user, user_secret, { expiresIn: '180s' });
      console.log(token);
      res.status(200).send(token);
    } else {
      console.log(err);

      res.status(500).send('User not found ');
    }
    pool.end;
  });
};
