import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { CLOUDAPIKEY, CLOUDNAME, CLOUDAPISECRET } from "../env.access.js";
import ApiError from "../helpers/CustomError.js";

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUDAPISECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "employeeImageUploads",
    format: async (req, file) => {
      return file.mimetype === "image/jpeg" ? "jpg" : "png";
    },
    public_id: (req, file) => {
      const publicId = file.originalname.split(".")[0] + "";
console.log(publicId);

      return publicId;
    },
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only .jpg and .png files are allowed!"), false);
  }
};
const cloudinaryFileUploader = multer({
  storage: storage,
  fileFilter: fileFilter,
});
// const deleteImageFromCloudinary = async (public_id) => {
//     try {
//       const result = await cloudinary.uploader.destroy(public_id);
//       console.log("Cloudinary delete result:", result);
//       return result;
//     } catch (error) {
//       console.error("Error deleting from Cloudinary:", error);
//       throw new Error("Error deleting image from Cloudinary");
//     }
// }
export { cloudinaryFileUploader};
