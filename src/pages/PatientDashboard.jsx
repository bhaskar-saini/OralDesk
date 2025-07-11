import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const allPatients = JSON.parse(localStorage.getItem("patients")) || [];

    const filtered = allAppointments.filter((a) => String(a.pid) === String(user?.id));
    const info = allPatients.find((p) => String(p.id) === String(user?.id));

    setAppointments(filtered);
    setPatient(info);
  }, [user]);


  const upcoming = appointments.filter(
    (a) => new Date(a.appointmentDate) > new Date()
  ).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  const reconstructDataUrl = (file) =>
    file?.base64 && file?.type
      ? `data:${file.type};base64,${file.base64}`
      : "#";

  return (
    <div className="min-h-screen bg-blue-100 p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to the PatientDashboard
        </h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition"
        >
          Logout
        </button>
      </div>

      {patient && (
        <div className="bg-white rounded-lg shadow p-4 mb-6 max-w-md">
          <h2 className="text-lg font-semibold mb-2">Patient Info</h2>
          <p><strong>PID:</strong> {patient.id}</p>
          <p><strong>Name:</strong> {patient.patientName}</p>
          <p><strong>Date of Birth:</strong> {patient.dob}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4 mb-6 max-w-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Upcoming Appointments
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments.</p>
        ) : (
          <ul className="divide-y">
            {upcoming.map((a) => (
              <li key={a.id} className="py-3">
                <p><strong>Title:</strong> {a.title}</p>
                <p><strong>Date:</strong> {new Date(a.appointmentDate).toLocaleString()}</p>
                <p><strong>Comments:</strong> {a.comments || "—"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6 max-w-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Appointment History
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No appointment history available.</p>
        ) : (
          <div className="space-y-4">
            {upcoming.map((a) => (
              <div key={a.id} className="border-b pb-3">
                <p><strong>Date:</strong> {new Date(a.appointmentDate).toLocaleString()}</p>
                <p><strong>Status:</strong> {a.status}</p>
                <p><strong>Treatment:</strong> {a.title}</p>
                <p><strong>Cost:</strong> ${a.cost || "—"}</p>
                <p><strong>Next Appointment:</strong> {a.nextDate ? new Date(a.nextDate).toLocaleString() : "—"}</p>

                {a.files && a.files.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Files:</p>
                    <ul className="list-disc list-inside">
                      {a.files.map((file, i) => (
                        <li key={i}>
                          <a
                            href={reconstructDataUrl(file)}
                            download={file.name}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline text-sm"
                          >
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
