# Hospital Appointment Booking System - Complete Basic Version

This is the continuation of the original Hospital Appointment Basic project.

## Technology

Frontend:
- React
- Vite
- React Router
- CSS

Backend:
- Node.js
- Express.js
- Mongoose
- REST API

Database:
- Local MongoDB Community Server

API testing:
- Thunder Client extension in VS Code

No MongoDB Atlas or external API is required.

## Folder structure

hospital-appointment-basic-complete
├── backend
│   ├── config
│   ├── models
│   ├── routes
│   ├── .env
│   ├── seed.js
│   └── server.js
└── frontend
    └── src
        ├── components
        ├── pages
        ├── App.jsx
        ├── api.js
        └── main.jsx

## Run backend

Open VS Code terminal:

cd backend
npm install
npm run dev

Expected:

MongoDB connected
Server running on http://localhost:5000

## Run frontend

Open a second VS Code terminal:

cd frontend
npm install
npm run dev

Open:

http://localhost:5173

## Create demo data

After backend is running, open:

http://localhost:5000/api/health

Then create demo accounts by running this in the backend terminal:

node seed.js

Expected:

Demo data created.

Demo accounts:

Patient
patient@hospital.com
patient123

Doctor
doctor@hospital.com
doctor123

Admin
admin@hospital.com
admin123

## If port 5000 is already in use

Stop the old Node server with Ctrl+C.

If you cannot find it:

netstat -ano | findstr :5000

Then use:

taskkill /PID YOUR_PID /F

Then:

npm run dev

## Main features

Patient:
- Register
- Login
- Search doctors
- View doctors
- Book appointment
- View appointments
- Cancel appointment

Doctor:
- Login
- View own appointments
- Confirm appointment
- Complete appointment

Admin:
- Login
- Dashboard statistics
- Add doctor
- View doctors

## Thunder Client examples

GET
http://localhost:5000/api/health

GET
http://localhost:5000/api/doctors

POST
http://localhost:5000/api/auth/register

Body JSON:
{
  "name": "Rahul Patil",
  "email": "rahul@gmail.com",
  "password": "123456",
  "phone": "9876543210"
}

POST
http://localhost:5000/api/auth/login

Body JSON:
{
  "email": "patient@hospital.com",
  "password": "patient123"
}

GET
http://localhost:5000/api/appointments

GET
http://localhost:5000/api/admin/stats

This project is for educational/college use. Authentication is intentionally basic and should not be used for a real hospital system.
