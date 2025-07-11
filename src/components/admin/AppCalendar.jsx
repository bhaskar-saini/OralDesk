import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const AppCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [viewMode, setViewMode] = useState("month");

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setAppointments(storedAppointments);
    setPatients(storedPatients);
  }, []);

  const getPatientName = (pid) =>
    patients.find((p) => p.id === pid)?.patientName || `PID: ${pid}`;

  const groupAppointmentsByDate = () => {
    const grouped = {};
    appointments.forEach((a) => {
      const dates = [a.appointmentDate];
      if (a.nextDate) dates.push(a.nextDate);
      dates.forEach((d) => {
        const key = new Date(d).toDateString();
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({
          ...a,
          date: d,
          patientName: getPatientName(a.pid),
        });
      });
    });
    return grouped;
  };

  const appointmentsByDate = groupAppointmentsByDate();

  const generateMonthView = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay();
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(currentYear, currentMonth, d));
    }
    return days;
  };

  const generateWeekView = () => {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // set to Sunday
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const calendarDays = viewMode === "month" ? generateMonthView() : generateWeekView();

  return (
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar />
      <main className="flex-1 p-6 hidden sm:block">
        <div className="flex items-center justify-between mb-4 ">
          <h1 className="text-2xl font-bold text-gray-800">
            Appointment Calendar - {today.toLocaleString("default", { month: "long" })}
          </h1>
          <div className="space-x-2">
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1 rounded font-medium ${
                viewMode === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1 rounded font-medium ${
                viewMode === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-2 text-sm font-semibold text-center text-gray-600">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date, idx) => {
            if (!date) {
              return <div key={idx} className="h-25 bg-transparent" />;
            }

            const key = date.toDateString();
            const dayAppointments = appointmentsByDate[key] || [];

            return (
              <div
                key={key}
                className="bg-white rounded-lg shadow p-2 h-25 overflow-y-auto flex flex-col"
              >
                <div className="text-xs font-bold text-gray-700 mb-1">
                  {date.getDate()}
                </div>
                {dayAppointments.map((a, i) => (
                  <div
                    key={i}
                    className="bg-blue-100 text-xs rounded px-1 py-0.5 mb-1"
                  >
                    <div>
                      <strong>{a.pid}</strong> - {a.patientName}
                    </div>
                    <div>{a.title}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AppCalendar;
