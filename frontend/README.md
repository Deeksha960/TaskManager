# Task Manager Web App

A full-featured Task Management System built with **MERN stack** (MongoDB, Express, React, Node.js) and **Material UI**, supporting photo uploads, progress tracking, calendar integration, role-based dashboards, and more.

## Features

### Authentication

- User Registration & Login
- Role-based access: Admin & User
- JWT-based session handling

### Role-specific Dashboards

#### Admin Dashboard

- View all tasks on a shared calendar
- Approve / Reject / Delete any task
- Filter tasks by user, status, or date
- Toggle light/dark mode
- View toast notifications on status changes

#### User Dashboard

- Create new tasks
- Upload photos (max 5 per task)
- Track task progress with slider
- View only own tasks on a personal calendar

### Calendar View

- FullCalendar integration
- View by day/week/month
- Hover tooltips for task details
- Color-coded status display (Pending, Approved, Rejected)

### Photo Uploads

- Upload up to 5 images per task
- Stored locally (`/uploads/` folder)

### Responsive UI

- Built with Material UI (MUI)
- Supports dark mode
- Mobile friendly layout

## Tech Stack

| Frontend     | Backend              | Database | UI                  |
| ------------ | -------------------- | -------- | ------------------- |
| React        | Node.js              | MongoDB  | Material UI (MUI)   |
| Axios        | Express              | Mongoose | FullCalendar        |
| React Router | Multer (file upload) | JWT      | Toast Notifications |

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Deeksha960/RaskManager.git

cd TaskManagerApp


###Backend setup

cd backend
npm install

.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

npm run server  # Starts on http://localhost:5000

### Frontend setup

cd frontend
npm install
npm run dev  # Starts on http://localhost:5173


### Test Users
Role	Email	Password
Admin	admin@test.com	12345678
User	user@test.com	12345678
```
### Known Issues
** Backend cold start delay on Render: The first request may take a few seconds due to server cold start.

** No email verification on registration, which could be added for better security.

** Basic validation only on frontend forms (could be improved using libraries like Yup + Formik).

** File upload size limit is not enforced ** users could accidentally upload large files.

### Future Improvements
** Add pagination and search to the Admin task list.

** Polish UI with loading spinners and transitions using libraries like Framer Motion.

** Implement JWT refresh tokens for longer sessions and improved security.

** Add recurring tasks and reminders via email or notifications.

** Improve mobile responsiveness for smaller screens.

** Add comments or collaboration on tasks for teams.


### Github LInk:
Github: https://github.com/Deeksha960/TaskManager.git


### Deployment Links :
Vercel : https://task-manager-frontend-njbc99qwd-deeksha-raos-projects.vercel.app/

Render Backend: "https://taskmanagerapp-jutv.onrender.com",

Render Frontend: https://taskmanager-frontend-zijb.onrender.com