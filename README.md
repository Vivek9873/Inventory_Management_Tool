# 📦 Inventory Management Tool – Backend API

This is a backend API project for an **Inventory Management System**  
It allows users to register, login, and manage products with JWT-based authentication.

---

### Swagger link

http://localhost:8080/api-docs

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Password Security**: bcrypt.js
- **Testing Tool**: Python script using `requests` (provided in assignment)

---

## 🚀 Features Implemented

### ✅ User Authentication

- Register with `username`, `email`, `password`
- Login to receive a JWT token
- Passwords are hashed with bcrypt before storage

### ✅ Product Management

- Add product (JWT protected)
- Update product quantity (JWT protected)
- Get product list with pagination and sorting

### ✅ Pagination & Sorting

- `GET /products` supports:
  - `?page=1&limit=7`
  - `?sortBy=price&sortOrder=asc`

---

## 📁 API Endpoints

| Method | Endpoint                 | Description                     |
| ------ | ------------------------ | ------------------------------- |
| POST   | `/register`              | Register a new user             |
| POST   | `/login`                 | Login and get JWT token         |
| POST   | `/products`              | Add a new product (auth req.)   |
| PUT    | `/products/:id/quantity` | Update product quantity         |
| GET    | `/products`              | Get paginated & sorted products |

**Note**: All `/products` routes require `Authorization: Bearer <token>` header.

---

## 💻 How to Run Locally

```bash
# 1. Clone the project
git clone <your-repo-url>

# 2. Install dependencies
npm install

# 3. Create a .env file (see below)

# 4. Start the server
node app.js
```
