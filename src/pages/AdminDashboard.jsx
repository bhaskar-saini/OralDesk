import React,{useState,useEffect} from 'react'
import Sidebar from '../components/admin/Sidebar'

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setPatients(storedPatients);
    setAppointments(storedAppointments);
  }, []);

  const totalPatients = patients.length;
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === "Pending").length;
  const completedAppointments = appointments.filter(a => a.status === "Completed").length;
  const revenue = appointments.filter(a => a.status === "Completed").reduce((sum, a) => sum + parseFloat(a.cost || 0), 0);

  const nextAppointments = [...appointments]
    .filter(a => new Date(a.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10)
    .map(a => ({
      ...a,
      patientName: patients.find(p => p.id === a.pid)?.patientName || `PID: ${a.pid}`
    }));
    
  const patientCounts = appointments.reduce((acc, a) => {
    acc[a.pid] = (acc[a.pid] || 0) + 1;
    return acc;
  }, {});

  const topPatients = Object.entries(patientCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([pid, count]) => {
      const patient = patients.find(p => p.id === pid);
      return {
        pid,
        name: patient?.patientName || `PID: ${pid}`,
        count
      };
  });

  const KpiCard = ({ title, value, color }) => {
    const colorMap = {
      blue: "text-blue-600 border-blue-400",
      indigo: "text-indigo-600 border-indigo-400",
      yellow: "text-yellow-600 border-yellow-400",
      green: "text-green-600 border-green-400",
      purple: "text-purple-600 border-purple-400"
    };

    return (
      <div className={`bg-white border-t-4 rounded-xl p-4 shadow ${colorMap[color]}`}>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className={`text-2xl font-bold ${colorMap[color].split(" ")[0]}`}>{value}</p>
      </div>
    );
  };

  return (
    <div className="flex bg-blue-100">
      <Sidebar/>
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <KpiCard title="Total Patients" value={totalPatients} color="blue" />
          <KpiCard title="Total Appointments" value={totalAppointments} color="indigo" />
          <KpiCard title="Pending" value={pendingAppointments} color="yellow" />
          <KpiCard title="Completed" value={completedAppointments} color="green" />
          <KpiCard title="Revenue ($)" value={revenue.toFixed(2)} color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-3">Next 10 Appointments</h2>
            <div className="bg-white shadow rounded-lg p-4">
              {nextAppointments.length === 0 ? (
                <p className="text-gray-500">No upcoming appointments.</p>
              ) : (
                <ul className="divide-y">
                  {nextAppointments.map(a => (
                    <li key={a.id} className="py-2 flex justify-between items-center">
                      <div className="text-sm text-blue-600">{a.pid}</div>
                      <div className="text-sm text-gray-700 font-medium">{a.patientName}</div>
                      <div className="text-sm text-gray-500">{new Date(a.appointmentDate).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-3">Top Patients</h2>
            <div className="bg-white shadow rounded-lg p-4">
              {topPatients.length === 0 ? (
                <p className="text-gray-500">No patient data available.</p>
              ) : (
                <ul className="divide-y">
                  {topPatients.map(p => (
                    <li key={p.pid} className="py-2 flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-700">{p.name}</div>
                      <div className="text-sm text-gray-500">Appointments: {p.count}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

      </main>
    </div>
  )
}

export default AdminDashboard