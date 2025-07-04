import React from 'react'
import logo from '/logo.svg'
import {ChevronLeft, ChevronRight, Dashboard, Person, BookOnline, CalendarMonth, Logout} from '@mui/icons-material';
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  
  const listItems = [
    {id:'1', name: 'AdminDashboard', icon: Dashboard, to: '/admin/dashboard'},
    {id:'2', name: 'Patients', icon: Person, to: '/admin/'},
    {id:'3', name: 'Appointments', icon: BookOnline, to: ''},
    {id:'4', name: 'Calendar', icon: CalendarMonth, to: ''},
  ];

  return (
    <aside className="h-screen w-54 bg-blue-400 text-white flex flex-col p-4">
      <div id="top" className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-white">
            Oral<span className="text-cyan-300">Desk</span>
          </h1>
        </div>
        <button><ChevronLeft className="w-5 h-5"></ChevronLeft></button>
      </div>
      <nav>
        <ul>
          {listItems.map((item) => (
            <li key={item.id} className="mb-2">
              
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar