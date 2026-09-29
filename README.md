# 🚀 Personal Portfolio Website

A personal portfolio website currently under development using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js).

The goal of this project is to showcase my skills, projects, and experience through a modern, responsive, and dynamic portfolio website.

> 🚧 **Status:** In Development

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary for image uploads

### Tools

* Git & GitHub
* Postman
* Visual Studio Code

---

## ✨ Features

* 🏠 Home section with personal introduction
* 👤 About section
* 💻 Dynamic project showcase
* 🖼️ Project image uploads using Cloudinary
* 🛠️ Skills section
* 📩 Dynamic contact information
* 🔐 Admin authentication using JWT
* 🌙 Dark mode support
* 📱 Responsive UI

*Features are being developed and improved.*

---

## 📂 Project Structure

```text
portfolio/
├── frontend/
│   ├── public/
│   └── src/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd portfolio
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Keep your `.env` file private. Never commit credentials to GitHub.**

### 4. Start the backend

```bash
npm start
```

The backend API will run at:

`http://localhost:5000`

### 5. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm start
```

The frontend will usually run at:

`http://localhost:3000`

---

## 🔌 API Overview

| Feature        | Endpoint                   |
| -------------- | -------------------------- |
| Get projects   | `GET /api/projects`        |
| Add project    | `POST /api/projects/add`   |
| Delete project | `DELETE /api/projects/:id` |
| Get skills     | `GET /api/skills`          |
| Get contacts   | `GET /api/contacts`        |
| Add contact    | `POST /api/contacts/add`   |
| Admin login    | `POST /api/auth/login`     |

Some endpoints require admin authentication.

---

## 🗺️ Future Improvements

* [👤] Complete portfolio UI and responsive design
* [ ] Build an admin dashboard
* [ ] Improve project and skill management
* [ ] Add form validation and error handling
* [ ] Deploy the frontend and backend
* [ ] Add Docker and Docker Compose
* [ ] Set up CI/CD using GitHub Actions

---

## 👨‍💻 About Me

I'm an aspiring software engineer learning and building full-stack web applications.

This portfolio is part of my journey to improve my development skills and showcase the projects I create.

---

⭐ **Thank you for checking out my project!**

More updates coming soon.
