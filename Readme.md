# 🏗️ Builder Hub

Builder Hub is a full-stack web application that connects **buyers** and **sellers** of building materials. The platform provides user-friendly interfaces for both parties with features like login, signup, JWT-based authorization, and password recovery.

---

## 📌 Tech Stack

### 🖥️ Frontend
- **React.js**
- React Router DOM
- TailwindCSS / Bootstrap (Optional based on your setup)

### ⚙️ Backend
- **Node.js**
- **Express.js**

### 🗃️ Database
- **Mongo Database** 

### 🔒 Authentication
- JWT (JSON Web Token)
- Password hashing with **bcrypt**
- Forgot password functionality via email (Nodemailer or similar)

---

## ✨ Features

### 👤 User Roles
- **Buyer**:
  - Can sign up / log in
  - Browse building materials
  - Place inquiries or purchase items
- **Seller**:
  - Can sign up / log in
  - Post and manage listings
  - Track buyer interest

### 🔐 Authentication
- Login / Signup pages for both buyers and sellers
- JWT-based secure routes
- Forgot password feature with email verification/reset

### 🧑‍💻 Interfaces
- **Buyer Dashboard**:
  - View and search building materials
  - Contact seller
- **Seller Dashboard**:
  - Add, edit, delete product listings
  - View buyer inquiries
