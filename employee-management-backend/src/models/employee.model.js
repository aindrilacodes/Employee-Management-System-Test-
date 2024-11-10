import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema(
  {
    ID:{
        type:String,
        required:true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: [true,"Email already exists!"],
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    Gender: {
      type: String,
      required: true,
    },

    Mobile: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit mobile number"],
    },
    Designation: {
      type: String,
      required: true,
    },
    Course: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
