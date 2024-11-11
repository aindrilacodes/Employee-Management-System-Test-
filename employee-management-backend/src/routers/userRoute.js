import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import verifyUserToken from "../middlewares/authusertokenverify.js";
import { cloudinaryFileUploader } from "../middlewares/fileUploader.js";
const router = express.Router();

router.route("/getEmployees").get(verifyUserToken, getUsers);
router
  .route("/createEmployee")
  .post(verifyUserToken, cloudinaryFileUploader.single("Image"), createUser);
router.route("/:ID/deleteEmployee").delete(verifyUserToken, deleteUser);
router.route("/:ID/updateEmployee").put(verifyUserToken,cloudinaryFileUploader.single("Image"), updateUser);
export default router;
