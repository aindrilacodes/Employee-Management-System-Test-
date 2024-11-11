import { useState } from "react";
import axios from "axios"
import { useAuth } from "../../API/authApi";
import { useNavigate } from "react-router-dom";
const Login = () => {
 const [userName,setuserName]=useState('')
 const [Password,setpassword]=useState('')
const [error,seterror]=useState(null)
const {login}=useAuth()
const navigate = useNavigate()

 const handleSubmit=async(e)=>{
e.preventDefault()
seterror(null);
try {
    const response=await axios.post("http://localhost:8001/api/auth/login",{userName:userName,pwd:Password})  
   const storeData=response.data.data.userData
   console.log(storeData);
   if (response.data.success) {
    login(storeData)
    localStorage.setItem("token",response.data.data.userAccessToken)
   navigate('/admin-dashboard')
    console.log( response.data.message);
} 
}catch (error) {
    if (error.response && error.response.data) {
        seterror(error.response.data.message || "Login failed. Please try again.");
      } else {
        seterror("An error occurred. Please check your network connection and try again.");
      }
      console.error(error);
      
}
 }
    return (
        <div className="flex flex-col h-screen items-center justify-center p-3 bg-gray-100"> 
        <div className="p-3 max-w-md w-full mx-auto border border-slate-400 shadow-md bg-white">
          <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form action=""  className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex gap-3 items-center">
            <label htmlFor="userName" className="font-semibold text-sm ">UserName</label>
            <input
              type="text"
              placeholder="Enter your User Name"
              className="border p-2 rounded-lg w-full text-sm"
              id="userName"
              onChange={(e)=>setuserName(e.target.value)}
              value={userName}
            />
            </div>
           
            <div className="flex items-center gap-3 ">
                <label htmlFor="pwd" className="font-semibold text-sm ">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="border p-2 rounded-lg w-full text-sm"
              id="pwd"
              onChange={(e)=>setpassword(e.target.value)}
              value={Password}
            />
            </div>
            
            <button
             
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 "
            >
             Login
            </button>
          </form>
        </div>
        </div>
      );
  
};

export default Login;
