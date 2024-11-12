import { successResponse } from "../helpers/ApiResponse.js";
import ApiError from "../helpers/CustomError.js";
import T_login from "../models/login.model.js";
import AsyncHandler from "express-async-handler";

const login = AsyncHandler(async (req, res) => {
  const { userName, pwd } = req.body;
  if (!userName || !pwd) throw new ApiError(400, "All fields required!");

  const user = await T_login.findOne({ userName });
  if (!user) {
    throw new ApiError(400,"Invalid login credentials!User does not exist");
  }
  
  const isPasswordValid = await user.passwordValidityCheck(pwd);
  if (!isPasswordValid)
    throw new ApiError(401, "Invalid login credentials! Password Incorrect");
  const  token  = await user.generateUserAccessToken();
  if (!token) throw new ApiError(400, "Error while generating token!");
  res.status(200).json(
    new successResponse("Login Successful!", {
      userData: user.userName,
      userAccessToken:token
    })
  );
});

const logout=AsyncHandler(async(req,res)=>{
  res.status(200).json(new successResponse("User logged Out Successfully!"));
});


export { login ,logout};
