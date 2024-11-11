import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar"; 

const EditEmployee = () => {
  const navigate = useNavigate();
  const { ID } = useParams();
  
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8001/api/users/${ID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = response.data.data.employee;

      
        setName(data.Name || "");
        setEmail(data.Email || "");
        setGender(data.Gender || "");
        setMobile(data.Mobile || "");
        setDesignation(data.Designation || "");
        setCourse(data.Course || "");
        setImage(data.Image || null);  
      } catch (error) {
        console.error("Error fetching employee data:", error);
        alert("Failed to load employee details.");
      }
    };

    fetchEmployee();
  }, [ID]);


  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);  
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !gender || !mobile || !designation || !course) {
      alert("Please fill in all fields.");
      return;
    }

   
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Gender", gender);
    formData.append("Mobile", mobile);
    formData.append("Designation", designation);
    formData.append("Course", course);
    formData.append("Image", image);  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8001/api/users/${ID}/updateEmployee`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",  
          },
        }
      );
      console.log(response.data);
      
      alert(response.data.message);
      navigate("/admin-dashboard/employees"); 
    } catch (error) {
      console.error("Error updating employee:", error);
      alert(error.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="w-full max-w-4xl mx-auto flex flex-col py-4 px-6 border border-slate-200 shadow-lg gap-4 bg-white mt-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Edit Employee
        </h1>

        {image && typeof image === 'string' ? (
          <div className="mb-4">
            <img
              src={`${image}`}  
              alt="Employee"
              className="w-32 h-32 object-cover"
            />
          </div>
        ) : (
          image && <div>Image uploaded will appear here</div>  
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 w-full border rounded-md"
              placeholder="Enter name"
            />
          </div>

        
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 w-full border rounded-md"
              placeholder="Enter email"
            />
          </div>

          
          <div className="flex items-center space-x-6">
            <span className="font-medium text-gray-700">Gender</span>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
                className="mr-2"
              />
              Female
            </label>
          </div>

        
          <div>
            <label htmlFor="mobile" className="block text-gray-700 font-medium">
              Mobile No.
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="p-2 w-full border rounded-md"
              placeholder="Enter mobile number"
            />
          </div>

       
          <div>
            <label htmlFor="designation" className="block text-gray-700 font-medium">
              Designation
            </label>
            <select
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="p-2 w-full border rounded-md"
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

         
          <div className="space-y-2">
            <span className="font-medium text-gray-700">Course</span>
            {["BCA", "MCA", "BSc"].map((courseOption) => (
              <label className="block" key={courseOption}>
                <input
                  type="radio"
                  value={courseOption}
                  checked={course === courseOption}
                  onChange={() => setCourse(courseOption)}
                  className="mr-2"
                />
                {courseOption}
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="p-2 w-full border rounded-md"
            />
          </div>

          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/employees")}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-md"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
