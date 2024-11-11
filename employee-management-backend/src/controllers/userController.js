import { successResponse } from "../helpers/ApiResponse.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import ApiError from "../helpers/CustomError.js";
import T_login from "../models/login.model.js";
import AsyncHandler from "express-async-handler";
import crypto from "crypto-random-string";
import Employee from "../models/employee.model.js";
import { format } from "date-fns";
import { cloudinaryFileUploader } from "../middlewares/fileUploader.js";

const getUsers = AsyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const sortBy = req.query.sortBy || "ID";
  const status = req.query.status;
  const searchRegExp = new RegExp(".*" + search + ".*", "i");
  const filter = {
    $or: [
      { Name: { $regex: searchRegExp } },
      { Email: { $regex: searchRegExp } },
      { ID: { $regex: searchRegExp } },
    ],
  };
  if (status) {
    filter.isActive = status === true;
  }
  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = 1;
  }
  const options = { updatedAt: 0 };
  const users = await Employee.find(filter, options)
    .select("-_id -__v")
    .sort(sortOptions)
    .limit(limit)
    .skip((page - 1) * limit);
  const count = await Employee.find(filter).countDocuments();
  const activeCount = await Employee.countDocuments({ isActive: true });
    const inactiveCount = await Employee.countDocuments({ isActive: false });

  if (!users || users.length === 0) throw ApiError(404, "No Employees found!");

  const employees = users.map((user) => {
    const formattedCreatedAt = user.createdAt
      ? format(new Date(user.createdAt), "dd-MMM-yy")
      : null;

    return {
      ...user.toObject(),
      createdAt: formattedCreatedAt,
    };
  });

  

  return res.status(200).json(
    new successResponse("Employees returned!", {
      employees,
      TotalCount: count,
      activeCount,
      inactiveCount,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    })
  );
});
const getUserById = AsyncHandler(async (req, res) => {
  const  ID  = req.params.ID; 
  const user = await Employee.findOne({ ID: ID })
    .select("-_id -__v");

  if (!user) {
    throw ApiError(404, "Employee not found!");
  }

  const formattedCreatedAt = user.createdAt
    ? format(new Date(user.createdAt), "dd-MMM-yy")
    : null;


  const employeeData = {
    ...user.toObject(),
    createdAt: formattedCreatedAt,
  };

  return res.status(200).json(
    new successResponse("Employee details returned!", {
      employee: employeeData,
    })
  );
});

const createUser = AsyncHandler(async (req, res) => {
  const { Name, Email, Mobile, Designation, Gender, Course } = req.body;

  if (!Name || !Email || !Mobile || !Designation || !Gender || !Course)
    throw ApiError(400, "All fields required!");
  const Image = req.file ? req.file?.path : null;
  if (!Image) throw new ApiError(400, "Image not provided");

  const employee = await Employee.exists({ Email });
  if (employee) throw new ApiError(400, "Employee Already exists!");
  const ID = crypto({ length: 10, characters: "01234" });
  const newEmployee = {
    Name,
    Email,
    Designation,
    Gender,
    Mobile,
    Course,
    ID,
    Image,
  };
  const emp_details = await Employee.create(newEmployee);
  const empDetailsWithoutId = emp_details.toObject();
  delete empDetailsWithoutId._id;
  delete empDetailsWithoutId.__v;
  return res
    .status(201)
    .json(
      new successResponse("Employee created Successfully!", empDetailsWithoutId)
    );
});
const deleteUser = AsyncHandler(async (req, res) => {
  console.log("reaching");
  
  const ID = req.params.ID;


  const emp = await Employee.find({ ID: ID });
console.log(emp);


  const deletedUser = await Employee.deleteOne({ ID });
  if (!deletedUser) throw new ApiError(404, "No user found for deletion");
  return res
    .status(200)
    .json(new successResponse("Employee deleted successfully!"));
});
const updateUser = AsyncHandler(async (req, res) => {
  const ID = req.params.ID;
  let updates = {};
  const updateoptions = { new: true, runValidators: true };

  if (req.body.Email) updates.Email = req.body.Email;
  if (req.body.Name) updates.Name = req.body.Name;
  if (req.body.Mobile) updates.Mobile = req.body.Mobile;
  if (req.body.Designation) updates.Designation = req.body.Designation;
  if (req.body.Gender) updates.Gender = req.body.Gender;
  if (req.body.Course) updates.Gender = req.body.Course;

  
  if (req.file) {
    updates.Image = req.file.path;
  }
  console.log(updates);
  const updatedUser = await Employee.findOneAndUpdate(
    { ID },
    updates,
    updateoptions
  ).select("-_id -__v");
  console.log(updatedUser);
  
  if (!updatedUser) {
    throw new ApiError(
      400,
      "No such Employee Found!Failed to Update employee!"
    );
  }
  return res
    .status(200)
    .json(new successResponse("User updated Successfully!", updatedUser));
});
export { getUsers, createUser, deleteUser, updateUser,getUserById };

