import { useAuth } from "../API/authApi";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/3447465.jpg" alt="Home Logo" className="h-8 w-8 mr-2" />
        </div>
        <NavLink
          to="/"
          className="text-slate-500 font-semibold hover:text-slate-700 "
        >
          Home
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className="text-slate-500 font-semibold hover:text-slate-700 "
        >
          Employee List
        </NavLink>

        <div className="flex items-center gap-6">
          <span className="text-gray-600 font-semibold   hover:text-slate-700 hover:after:font-bold">Welcome, {admin}!</span>

          <button
            onClick={handleLogout}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 "
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
