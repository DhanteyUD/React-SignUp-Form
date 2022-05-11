import bcrypt from "bcryptjs";
import { createHash } from "crypto";
export interface Payload {
  email: string;
  fullname: string;
  currentDate: Date;
}
const token = (details: Payload) => {
  return createHash("sha256").update(details.email).digest("hex");
};
const comparePasswords = (plainText: string, hash: string) => {
  return bcrypt.compare(plainText, hash);
};


export { token, comparePasswords };
