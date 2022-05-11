import { Request, Response, NextFunction } from "express";
import { token } from "../services/generateToken";
import { sendEmail } from "../controllers/sendEmail";
import pool from "../db/connection";
import { passLink } from "../services/resetPasswordTemp";
interface UserData {
  email: string;
}

async function forgotPassword(req: Request, res: Response) {
  let userData: UserData = req.body as unknown as UserData;

  try {
    const email = userData.email;
    const targetUser = await pool.query(
      `SELECT * FROM "Users" WHERE "email" = $1`,
      [email]
    );

    if (targetUser.rows.length) {
      const user = targetUser.rows[0];
      const payload = {
        email: user.email,
        phone: user.phone,
        fullname: user.fullname,
        date: new Date()
      };

      let getToken = token({ ...payload });
      pool.query(`UPDATE "Users" SET "resetToken" = $1 WHERE "email" = $2`, [
        getToken,
        email,
      ]);

      const link = `http://localhost:3000/reset-password/${getToken}`;
      const formattedEmail = passLink(user.fullname.split(' ')[0], link);

      await sendEmail(email, "Reset your LightPay Password", formattedEmail);
      return res
        .status(200)
        .json({
          message: "Click the reset link in your email to reset your password.",
        });
    } else {
      res.status(404).json({ message: "Invalid user email." });
    }
  } catch (err: any) {
    console.error(err.message);
    res.send();
  }
}

export default forgotPassword;