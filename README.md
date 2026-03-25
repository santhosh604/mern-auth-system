
# 🔐 MERN Authentication System

A full-stack authentication system built using the MERN stack with secure login, OTP verification, and protected routes.

---

## 🚀 Features

* User Registration & Login
* JWT Authentication (HTTP-only cookies)
* Password Hashing using bcrypt
* OTP Verification
* Reset Password
* Protected Routes
* Rate Limiting (login & OTP)
* Basic validation & error handling

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT
* bcrypt
* express-rate-limit

---

## 📁 Project Structure

mern-auth/
├── frontend/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ └── server.js

---

## 🔐 Authentication Flow

```text
Login → JWT stored in cookie
↓
Access protected route (/profile)
↓
Middleware verifies token
↓
User data returned
```

---

## 🛡️ Security Features

* HTTP-only cookies
* Password hashing
* Rate limiting
* Input validation

---

## 👨‍💻 Author

Santhosh
