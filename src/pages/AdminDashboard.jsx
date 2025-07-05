import React from 'react'
import Sidebar from '../components/admin/Sidebar'

const AdminDashboard = () => {
  return (
    <div className="flex bg-blue-100">
      <Sidebar/>
      <main>
        Admin
      </main>
    </div>
  )
}

export default AdminDashboard