﻿# Employee-Management-System-Test

## Overview
The **Employee Management Dashboard** is a web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It provides a secure and efficient platform for administrators to manage employee records, authenticate users, and manage sessions. Key features include user login, employee record display, and session handling.

## Features

### Login Page
- **Fields**: Username and Password.
- **Process**: Validates credentials via a backend API. Upon successful login, the admin is redirected to the dashboard.
- **Authentication**: Managed with Node.js and JWT for secure session handling.

### Admin Dashboard (Home Page)
- **Personalized Message**: Displays a welcome message, e.g., "Welcome Admin Panel."
- **Navigation Links**:
  - **Home**: Takes admin to the dashboard.
  - **Employee List**: Displays all employees.
  - **Logout**: Logs out the admin and ends the session.
- **Session Management**: The admin's name is stored in local storage.

### Employee List
- **Displays**: Employee records retrieved from the database.
- **Fields**: Name, Email, Mobile, Designation, Gender, Course, and Image.

## Database Structure

### 1. t_login Table (Login Credentials)
- **userName** (String, required, unique): Admin's username.
- **pwd** (String, required): Hashed password.
- **timestamps**: Automatically generated `createdAt` and `updatedAt`.

#### Methods:
- **pre-save**: Hashes the password before saving.
- **passwordValidityCheck**: Validates entered password with the hashed one.
- **generateUserAccessToken**: Generates a JWT token for authenticated sessions.

### 2. t_Employee Table (Employee Records)
- **ID** (String, required): Unique employee ID.
- **Name** (String, required): Employee name.
- **Email** (String, required, unique): Valid email address.
- **Gender** (String, required): Employee's gender.
- **Mobile** (String, required, unique): Valid 10-digit mobile number.
- **Designation** (String, required): Employee's job title.
- **Course** (String, required): Course or department the employee is associated with.
- **Image** (String, required): Profile image URL or path.
- **isActive** (Boolean, default: true): Status of the employee (active or not).
- **timestamps**: Automatically generated `createdAt` and `updatedAt`.

## Data Validation & Security
- **Server-Side Validation**: Ensures username and password meet required criteria.
- **Session Management**: Admin's session is handled with JWT and stored in `localStorage`.

## Technologies Used
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Assumptions

### Authentication:
1. Admin users have pre-existing accounts with hashed passwords.
2. JWT is used for authentication, with tokens expiring after a set period.
3. No password recovery functionality is provided.

### User Access:
1. Only authenticated admin users can access the dashboard.

### Security:
1. Passwords are securely hashed using bcrypt.

### Error Handling:
1. Basic error handling is in place for failed login attempts.

### Others
1.Used cloudinary to store employee images
## API Testing
 This collection includes all endpoints with example requests and expected responses.
 
Video Link of frontend:https://drive.google.com/file/d/1GEyIK7meqz_IoHHRryIozlwf6qqgjk66/view
[Access the Postman Collection here](https://www.postman.com/aindrila-dutta/workspace/projectworkspace/collection/38073821-be622779-f68b-4d45-aed1-df566ac2639b?action=share&creator=38073821)
