import express from "express";
const app = express();
import { PORT } from "./env.access.js";
import connectDB from "./config/db.connect.js";
import { errorResponse } from "./helpers/ApiResponse.js";
import ApiError from "./helpers/CustomError.js";
import authRouter from "../src/routers/authRoute.js"
import userRouter from "../src/routers/userRoute.js"
import morgan from "morgan";
import cors from "cors"

app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)


app.use((err, req, res, next) => {
  const status = err.status || 500; 
  const message = err.message || "Internal Server Error"; 
  const Response = new errorResponse(message);
  res.status(status).json(Response);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listen on port ${PORT}`);
  });
});
