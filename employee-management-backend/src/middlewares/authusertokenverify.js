import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import ApiError from "../helpers/CustomError.js";
import { TOKENSECRETKEY } from "../env.access.js";
import T_login from "../models/login.model.js";

const verifyUserToken=AsyncHandler(async(req,_,next)=>{
    // const token = req.cookies?.accessToken ||
   const token= req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, TOKENSECRETKEY);
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Invalid  user access token or token expired"
    );
  }
  const user = await T_login.findOne({userName:decodedToken.userName}).select("-pwd");
  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }
  req.user = user;
  next();
})
export default verifyUserToken