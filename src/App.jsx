import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Patients from './components/admin/Patients'
import Appointments from './components/admin/Appointments'
import Calendar from './components/admin/Calendar'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/patient/dashboard" element={<PatientDashboard />} />
      <Route path="/admin/appointments" element={<Appointments></Appointments>}></Route>
      <Route path="/admin/patients" element={<Patients></Patients>}></Route>
      <Route path="/admin/calendar" element={<Calendar></Calendar>}></Route>
    </Routes>
  )
}

export default App