import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKENEXPIRY, TOKENSECRETKEY } from "../env.access.js";
const t_loginSchema = new mongoose.Schema(
  {
    // sno: {
    //   type: Number,
    //   required: true,
    //   unique: true,
    // },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    pwd: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
t_loginSchema.pre("save", async function (next) {
  if (this.isModified("pwd") && this.pwd) {
    this.pwd = await bcrypt.hash(this.pwd, 10);
  }
  next();
});


t_loginSchema.methods.passwordValidityCheck = async function (pwd) {
    const result = await bcrypt.compare(pwd, this.pwd);
    return result;
  };
t_loginSchema.methods.generateUserAccessToken = async function () {
 const token= jwt.sign(
    {
      userName: this.userName,
    },
    TOKENSECRETKEY,
    { expiresIn: TOKENEXPIRY }
  );
  return token;
};
const T_login = mongoose.model("T_login", t_loginSchema);

export default T_login;
