import { createContext, useState, useContext } from "react";
import axios from "axios";
const userContext = createContext();
const AuthApi = ({children}) => {
  const [admin, setAdmin] = useState(()=>{
  return localStorage.getItem("admin") || null;
}
)
  const login = (storeData) => {
    setAdmin(storeData);
    localStorage.setItem("admin", storeData);
  };
  const logout =async () => {
    
    try {
        const token=localStorage.getItem("token")
        const response=await axios.post("http://localhost:8001/api/auth/logout",{},{
            headers: {
              'Authorization': `Bearer ${token}`,  
              'Content-Type': 'application/json', 
            }
            })
          
            if(response.data.success==true){
                alert(response.data.message)
                setAdmin(null);
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
               
            }
                   
    } catch (error) {
       console.error(error)
    }
   
  };
  return (
    <userContext.Provider value={{ admin, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
export const useAuth = () => useContext(userContext);
export default AuthApi;
