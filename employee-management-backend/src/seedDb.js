
import T_login from "./models/login.model.js";
import mongoose from "mongoose";
import { DB_URL } from "./env.access.js";
import Employee from "./models/employee.model.js"; 
import {emp} from "../employeedata.js"
mongoose
  .connect("mongodb+srv://aindriladutta392:potato@cluster0.zicfj.mongodb.net/Employee-Management-System")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log("Connection error:", err));

const seedUser = async () => {
  try {
    await T_login.deleteMany({});
    console.log("Existing users deleted.");

    const admin = { userName: "Hukum Gupta", pwd: "Abcdishk54613" };

    const user = await T_login.create(admin);  
    console.log(`1 user added to the database! ${user}`);
    await Employee.deleteMany({});
    console.log("Existing employees deleted.");

    const employee = {
      ID: "1001",
      Name: "Alice Johnson",
      Email: "alice.johnson@example.com",
      Gender: "Female",
      Mobile: "9876543210",
      Designation: "Developer",
      Course: "B.Tech",
      Image: "alice.jpg"
    };

    const newEmployees = await Employee.insertMany(emp);
    console.log(` employes added to the database! `);

  } catch (error) {
    console.error("Error in seeding users:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUser();
