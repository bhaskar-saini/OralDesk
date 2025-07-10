import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Sidebar from "./Sidebar";

const AppCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    if (stored) {
      setPatients(JSON.parse(stored));
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const appointmentsOnSelectedDate = appointments.filter(
    (a) =>
      new Date(a.appointmentDate).toDateString() === selectedDate.toDateString() ||
      (a.nextDate && new Date(a.nextDate).toDateString() === selectedDate.toDateString())
  );

  const getAppointmentCountForDate = (date) => {
    return appointments.reduce((count, a) => {
      const apptDateMatch = new Date(a.appointmentDate).toDateString() === date.toDateString();
      const nextDateMatch = a.nextDate && new Date(a.nextDate).toDateString() === date.toDateString();
      return count + (apptDateMatch ? 1 : 0) + (nextDateMatch ? 1 : 0);
    }, 0);
  };

  return (
    <div className="flex h-screen bg-blue-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Appointment Calendar</h1>

        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date, view }) =>
            view === 'month' && getAppointmentCountForDate(date) > 0 ? (
              <div className="text-[10px] text-white bg-red-500 w-3 h-3 rounded-full flex items-center justify-center mx-auto">
                {getAppointmentCountForDate(date)}
              </div>
            ) : null
          }
        />

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Appointments on {selectedDate.toDateString()}
          </h2>
          {appointmentsOnSelectedDate.length === 0 ? (
            <p className="text-gray-500">No appointments found.</p>
          ) : (
            <div className="space-y-3">
              {appointmentsOnSelectedDate.map((a) => {
                const isFollowUp = a.nextDate && new Date(a.nextDate).toDateString() === selectedDate.toDateString();
                const time = isFollowUp ? a.nextDate : a.appointmentDate;
                const patient = patients.find(p => p.id === a.pid)?.patientName || `PID: ${a.pid}`;

                return (
                  <div
                    key={`${a.id}-${isFollowUp ? 'next' : 'main'}`}
                    className="bg-white max-w-2xs rounded-lg shadow-sm px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                      <div className="text-sm text-gray-700 font-semibold">{patient}</div>
                      <div className="text-sm text-blue-600">{a.title}</div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppCalendar;
