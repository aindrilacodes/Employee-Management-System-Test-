import Navbar from "../../components/Navbar";
import EmployeeCount from "../../components/EmployeeCount";

const Admin_Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full h-screen mx-auto flex flex-col py-4 border border-slate-200 shadow-lg gap-2 ">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Welcome to Admin Dashboard!
        </h1>

        <EmployeeCount />
      </div>
    </div>
  );
};

export default Admin_Dashboard;
