# Full-Stack MERN Blog Application

A full-stack blog application built using the MERN stack.

## Features

- User registration and login
- JWT-based authentication
- Create blog posts
- Edit your own blog posts
- Delete your own blog posts
- View all blog posts
- Search blog posts
- Add comments
- View comments
- My Blogs section
- Protected post and comment operations

## Technologies Used

- React
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- JavaScript
- HTML
- CSS

## Project Structure

```text
blog-application/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── .gitignore
```

## Running the Application

### Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on the Vite development URL shown in the terminal.

## Environment Variables

Create a `.env` file inside the `backend` folder:

```text
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

Do not upload the `.env` file to GitHub.

## Authentication

The application uses JWT authentication to protect creating, editing, and deleting blog posts and adding comments.

## Author

Thanushree G M