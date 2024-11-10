import { login, logout } from "../controllers/authController.js";
import express from "express"
import verifyUserToken from "../middlewares/authusertokenverify.js";
const router=express.Router();

router.route("/login").post(login)
router.route("/logout").post(verifyUserToken,logout)
export default router