import "./index.css";

import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Preline from "./components/Preline";
import Login from "./components/Login";
import FormData from "./components/FormData";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import DashBoard from "./components/DashBoard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Preline />
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/signin' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/profile' element={<Profile/>} />
            <Route path='/form' element={<FormData/>} />
          </Route>
        </Route>
        <Route element={<AdminRoute/>}>
            <Route path="/dashboard" element={<DashBoard/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
