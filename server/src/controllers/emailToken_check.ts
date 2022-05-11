import { Request, Response, NextFunction } from "express";
import pool from "../db/connection";

pool.connect();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let str = req.url;
    const emailToken = str.slice(str.lastIndexOf("/") + 1);

    const verifiedToken = await pool.query(
      `SELECT * FROM Users WHERE (verifyToken) = $1`,
      [emailToken]
    );

    if (verifiedToken) {
      pool.query(
        `UPDATE Users SET (status) = $1, (emailVerifiedDate) = $2, (verifyToken) = $3 WHERE (verifyToken) = $4`,
        [true, Date.now(), null, emailToken]
      );
      res.status(200).send("User's email is verified.");
    } else {
      res.status(403).send("forbidden!");
    }
  } catch (err: any) {
    console.error(err.message);
  }
};

export default verifyToken;
