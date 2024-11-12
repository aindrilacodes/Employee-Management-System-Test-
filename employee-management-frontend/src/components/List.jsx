import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [statusFilter, setStatusFilter] = useState("all"); 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const columns = [
    {
      name: "Unique ID",
      selector: (row) => row.ID,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.Image,
      cell: (row) => (
        <img
          src={row.Image}
          alt={row.Name}
          className="w-12 h-12 object-cover"
        />
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row) => row.Mobile,
      sortable: false,
    },
    {
      name: "Designation",
      selector: (row) => row.Designation,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.Gender,
      sortable: true,
    },
    {
      name: "Course",
      selector: (row) => row.Course,
      sortable: false,
    },
    {
      name: "Create Date",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.isActive,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              row.isActive ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          {row.isActive ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.ID)}
            className="text-white p-2 rounded-full bg-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.ID)}
            className="text-white p-2 rounded-full bg-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8001/api/users/getEmployees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            search: searchQuery,
            page: currentPage,
            limit: rowsPerPage,
            isActive:
              statusFilter === "all"
                ? undefined
                : statusFilter === "active"
                ? true
                : false, 
          },
        }
      );

      const info = response.data.data.employees;
      setTotalEmployees(response.data.data.TotalCount);

     
      if (statusFilter === "active") {
        setData(info.filter((emp) => emp.isActive === true));
      } else if (statusFilter === "inactive") {
        setData(info.filter((emp) => emp.isActive === false));
      } else {
        setData(info); 
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, [currentPage, searchQuery, rowsPerPage, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (ID) => {
    navigate(`/edit/${ID}`);
  };

  const handleDelete = async (ID) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:8001/api/users/${ID}/deleteEmployee`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        fetchData();
        setAlertMessage(response.data.message);
        setAlertType("success");
        setShowAlert(true);

        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        console.error("Error deleting employee:", error);

        setAlertMessage("Failed to delete employee.");
        setAlertType("error");
        setShowAlert(true);

        setTimeout(() => setShowAlert(false), 3000);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (newPerPage) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
    fetchData();
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="w-full h-screen mx-auto flex flex-col py-4 px-6 border border-slate-200 shadow-lg gap-4 bg-gray-200 ">
        <h1 className="text-2xl font-semibold text-gray-800 text-center underline underline-offset-2">
          Employee List
        </h1>

        <div className="flex justify-between p-4 mb-4">
          <div className="text-lg font-medium text-gray-600">
            Total Employees:{" "}
            <span className="text-gray-800">{totalEmployees}</span>
          </div>
          <button
            className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              alert("Redirecting to employee creation form...");
              navigate(`/admin-dashboard/employees/create`);
            }}
          >
            Create New Employee
          </button>
        </div>

        <div className="mb-4 flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Name, Email, or ID"
            className="p-2 border rounded w-full"
          />

          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {showAlert && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
              alertType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{alertMessage}</span>
              <button
                onClick={() => setShowAlert(false)}
                className="bg-transparent border-none text-white font-semibold"
              >
                X
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md w-full p-2">
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationServer
            paginationPerPage={rowsPerPage}
            paginationTotalRows={totalEmployees}
            paginationRowsPerPageOptions={[4, 10, 15, 20]}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangePage={handlePageChange}
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default List;
