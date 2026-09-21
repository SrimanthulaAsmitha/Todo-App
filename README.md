# 📝 Todo App

A full-stack Todo application built using the **MERN stack**.
The application allows users to create, manage, search, edit, complete, and delete their tasks through a simple and responsive interface.

## 🚀 Features

* ➕ Add new tasks
* ✏️ Edit existing tasks
* 🗑️ Delete tasks
* ✅ Mark tasks as completed
* 🔍 Search todos
* 📋 View All, Completed, and Pending tasks
* 📅 Add due date and time
* 🌙 Dark mode / ☀️ Light mode
* 💾 Store todos using MongoDB
* 📱 Responsive user interface

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## 📂 Project Structure

```text
Todo-App/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/SrimanthulaAsmitha/Todo-App.git
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 5. Start the backend

```bash
npm start
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🗄️ Database

This application uses **MongoDB** to store todo information.

The backend connects to MongoDB using **Mongoose**.

> Make sure your MongoDB connection string is configured in your environment variables before running the backend.

## 🎯 Main Functionality

The application follows this basic flow:

```text
User
  ↓
Add Todo
  ↓
MongoDB
  ↓
Display Todos
  ↓
Edit / Complete / Delete
  ↓
Updated Todo List
```

## 📸 Screenshots

Screenshots of the application can be added here to demonstrate the user interface and features.

## 🔮 Future Improvements

* User authentication and login
* Individual todo lists for users
* Email reminders
* Priority levels
* Categories and tags
* Cloud deployment
* Improved mobile experience

## 👩‍💻 Author

**Srimanthula Asmitha**

GitHub: [SrimanthulaAsmitha](https://github.com/SrimanthulaAsmitha)

---

⭐ If you find this project useful, consider giving it a star!
