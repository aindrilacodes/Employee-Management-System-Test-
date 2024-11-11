import { useEffect, useState } from "react";
import { FaUsers, FaToggleOn, FaToggleOff } from "react-icons/fa";
import axios from "axios";

const EmployeeCount = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [activeEmployee, setActiveEmployee] = useState(0);
  const [inactiveEmployee, setInactiveEmployee] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const countEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token is missing");
        return;
      }

      const response = await axios.get("http://localhost:8001/api/users/getEmployees", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setEmployeeCount(response.data.data.TotalCount);
      setActiveEmployee(response.data.data.activeCount);
      setInactiveEmployee(response.data.data.inactiveCount);
    } catch (error) {
      console.error("Error fetching employee count:", error);
      setError("Failed to fetch employee data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    countEmployee();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-5">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-2 md:flex-row md:justify-between w-full">
      <div className="bg-yellow-100 p-4 mt-4 text-center w-full md:w-1/3 flex justify-center items-center gap-2">
        <FaUsers />
        <p className="text-lg font-medium">Total Employee Count: {employeeCount}</p>
      </div>
      <div className="bg-yellow-100 p-4 mt-4 text-center w-full md:w-1/3 flex justify-center items-center gap-2">
        <FaToggleOn />
        <p className="text-lg font-medium">Active Employee Count: {activeEmployee}</p>
      </div>
      <div className="bg-yellow-100 p-4 mt-4 text-center w-full md:w-1/3 flex justify-center items-center gap-2">
        <FaToggleOff />
        <p className="text-lg font-medium">Inactive Employee Count: {inactiveEmployee}</p>
      </div>
    </div>
  );
};

export default EmployeeCount;
