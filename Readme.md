# Todo App  

A feature-rich To-Do application built with **Flutter** (frontend) and **Node.js** (backend). This app allows users to manage their daily tasks with ease while providing a modern and scalable full-stack solution.  

---

## Features  
- **User Authentication**: Secure sign-up and login functionality.  
- **Task Management**: Create, update, and delete tasks.  
- **Real-Time Sync**: Instant updates between the frontend and backend.  
- **Modern UI**: Responsive and intuitive interface powered by Flutter.  

---

## Tech Stack  
### Frontend  
- **Flutter**: Dart-based framework for building a beautiful, cross-platform UI.  

### Backend  
- **Node.js**: Handles API requests and database interactions.  
- **Express.js**: Lightweight framework for building RESTful APIs.  
- **MongoDB**: NoSQL database for storing user accounts and tasks.  

---

## Installation  

### Prerequisites  
- Flutter installed on your machine.  
- Node.js and npm installed.  
- MongoDB set up locally or in the cloud.  

### Steps  
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```  

2. **Backend Setup**  
   - Navigate to the `backend` directory:  
     ```bash
     cd backend
     ```  
   - Install dependencies:  
     ```bash
     npm install
     ```  
   - Configure `.env` file for MongoDB connection and JWT secrets.  
   - Start the server:  
     ```bash
     npm start
     ```  

3. **Frontend Setup**  
   - Navigate to the `frontend` directory:  
     ```bash
     cd frontend
     ```  
   - Install Flutter dependencies:  
     ```bash
     flutter pub get
     ```  
   - Run the app:  
     ```bash
     flutter run
     ```  

---

## API Endpoints  

### Authentication  
- **POST** `/api/auth/register` - Register a new user.  
- **POST** `/api/auth/login` - Login with user credentials.  

### Todo Management  
- **GET** `/api/todos` - Fetch all todos.  
- **POST** `/api/todos` - Create a new todo.  
- **PUT** `/api/todos/:id` - Update a todo by ID.  
- **DELETE** `/api/todos/:id` - Delete a todo by ID.  

---

## Screenshots  
> Add screenshots of the app UI to showcase features like login, task list, and CRUD operations.  

---
