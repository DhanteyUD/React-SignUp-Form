import bcrypt from "bcryptjs";
import { createHash } from "crypto";

export interface Payload {
  email: string;
  phone: number;
  fullname: string;
  date: Date;
}

const token = (details: Payload) => {
  return createHash("sha256").update(details.email).digest("hex");
};

const comparePasswords = (plainText: string, hash: string) => {
  return bcrypt.compare(plainText, hash);
};


export { token, comparePasswords };