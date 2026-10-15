import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import Admin from "./pages/Admin";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("hospitalUser");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/book"
          element={
            user?.role === "patient" ? (
              <BookAppointment user={user} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        <Route
          path="/appointments"
          element={
            user ? (
              <Appointments user={user} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Admin />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
      </Routes>

      <footer>
        © 2026 CareBook Hospital | Mini Project
      </footer>
    </BrowserRouter>
  );
}
