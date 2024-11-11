# Employee-Management-System-Test
# Overview
This Admin Dashboard is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a secure and efficient platform for administrators to manage employee records, handle user authentication, and perform session management. The dashboard includes features like login, user session management, employee list display, and more.

# Features
Login Page:

Fields: Requires User Name and Password.
Login Process: Validates credentials through a backend API, and upon successful login, the user is redirected to the dashboard.
Authentication: Managed using Node.js for backend login verification and session management.
Admin Dashboard (Home Page):

Displays a personalized message like "Welcome Admin Panel."
Navigation Links:
Home: Takes the admin to the main dashboard page.
Employee List: Lists all employees within the organization.
Logout: Securely logs out the admin from the dashboard.
Session Management: The admin’s name (e.g., "Hukum Gupta") is stored in local storage for managing the session.
Employee List:

Employee List: Displays employee data, retrieved from the Employee table .
Employee data includes fields such as Name, Email, Mobile, Designation, Gender,Course and  Image.

# Database Structure
1. t_login Table (Login Credentials)
userName (String, required, unique): Unique admin username.
pwd (String, required): Hashed password.
timestamps: Auto-generated createdAt and updatedAt.
Methods:

pre-save: Hashes the password.
passwordValidityCheck: Compares entered password with hashed password.
generateUserAccessToken: Generates a JWT token.

2. t_Employee Table (Employee Records)
ID (String, required): Unique employee ID.
Name (String, required): Employee name.
Email (String, required, unique): Employee email (valid format).
Gender (String, required): Employee gender.
Mobile (String, required, unique): 10-digit mobile number.
Designation (String, required): Employee designation.
Course (String, required): Employee’s course.
Image (String, required): Profile image URL or path.
isActive (Boolean, default: true): Employee active status.
timestamps: Auto-generated createdAt and updatedAt.


# Data Validation & Security:

Server-Side Validation: Ensures that user input (username and password) meets required criteria.
Session Management: Utilizes local storage to handle user session, ensuring the admin’s name and other details persist across page reloads.

# Technologies Used
Frontend: React.js, TailwindCSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)

# Assumptions

Authentication:
1.Admins have pre-existing accounts with secure, hashed passwords.
2.JWT is used for authentication, with tokens that expire after a set period.
3.No password recovery functionality is included.

User Access:
1.Only admin users can access the dashboard.

Security:
1.Passwords are hashed using bcrypt.


Error Handling:
1.Basic error handling for failed login attempts.


