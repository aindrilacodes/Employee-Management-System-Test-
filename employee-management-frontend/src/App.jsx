
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./assets/pages/Login";
import Admin_Dashboard from "./assets/pages/Admin_Dashboard";
import List from "./components/List";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin-dashboard" element={<Admin_Dashboard />}></Route>

          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route
            path="/admin-dashboard/employees/create"
            element={<AddEmployee />}
          ></Route>
           <Route path="/edit/:ID" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
