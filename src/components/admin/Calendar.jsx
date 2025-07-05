import React from 'react'
import Sidebar from './Sidebar'

const Calendar = () => {
  return (
    <div className="flex bg-blue-100">
      <Sidebar/>
      <main>
        Calendar
      </main>
    </div>
  )
}

export default Calendar