import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Patients from './components/admin/Patients'
import Appointments from './components/admin/Appointments'
import AppCalendar from './components/admin/AppCalendar'
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminDashboard/></ProtectedRoute>} />
      <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={["Patient"]}><PatientDashboard/></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute allowedRoles={["Admin"]}><Appointments/></ProtectedRoute>} />
      <Route path="/admin/patients" element={<ProtectedRoute allowedRoles={["Admin"]}><Patients/></ProtectedRoute>} />
      <Route path="/admin/calendar" element={<ProtectedRoute allowedRoles={["Admin"]}><AppCalendar/></ProtectedRoute>} />
    </Routes>
  )
}

export default App