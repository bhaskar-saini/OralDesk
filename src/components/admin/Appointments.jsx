import React,{useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { Add } from "@mui/icons-material"
import AppointmentModal from "./AppointmentModal";

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [editInfo, setEditInfo] = useState(false);
  const [initialCreation, setInitialCreation] = useState(true);
  const [patients,setPatients] = useState([]);

  // localStorage.clear();

  useEffect(() => {
    const storedData = localStorage.getItem("appointments");
    try{
      if (storedData) {
        setAppointments(JSON.parse(storedData));
      }
      else{
        setAppointments([]);
      }
    }
    catch(e) {
      console.error("Error parsing appointments:",e);
      localStorage.removeItem("appointments");
      setAppointments([]);
    }
  },[]);

  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    try{
      if(storedPatients) {
        setPatients(JSON.parse(storedPatients));
      }
      else {
        setPatients([]);
      }
    }
    catch(e) {
      console.log("Error parsing patients: ",e);
      setPatients([]);
    }
  },[]);

  const saveInStorage = (updated) => {
    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    setEditInfo(false);
    setInitialCreation(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  const handleSave = (data) => {
    let updated  = [];
    if (data.id) {
      updated = appointments.map((app) => (
        app.id === data.id ? data : app
      ))
    } else {
      const newId = Date.now().toString();
      const newData = { ...data, id: newId };
      updated = [...appointments, newData];
    }
    setInitialCreation(false);
    saveInStorage(updated);
    handleModalClose();
    alert("Data Saved!")
  };

  const handleEdit = (ap) => {
    setEditInfo(ap);
    setIsModalOpen(true);
    setInitialCreation(false);
  };

  const handleDelete = (pid) => {
    const updated = appointments.filter(ap => ap.id !== pid);
    saveInStorage(updated);
  };

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
  );

  return (
    <div className="flex bg-blue-100">
      <Sidebar/>
      <main className="flex-1 p-4">
        <h1 className="mt-2 p-3 text-2xl text-gray-700 font-bold">Appointment Management</h1>
        <button className="flex gap-1 ml-4 cursor-pointer transition-all bg-indigo-500 text-white font-bold
         px-3 py-1 rounded-lg border-indigo-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
         hover:border-b-[6px] 
         active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
         onClick={handleAddClick}
        >
          <Add fontSize="small"/>
          Add Appointment
        </button>

        <div className="mt-5 overflow-x-auto mx-4">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="p-3 text-left">PID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Appointment Date</th>
                <th className="p-3 text-left">Next Appointment</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No Appointment found.
                  </td>
                </tr>
              ) : (
                sortedAppointments.map((ap) => {
                  const patient = patients.find(p => p.id === ap.pid);
                  const patientName = patient ? patient.patientName : 'N/A';
                  const patientDob = patient ? patient.dob : 'N/A';

                  return(
                    <tr key={ap.id} className="border-b last:border-b-0 even:bg-gray-50">
                      <td className="p-3">{ap.pid}</td>
                      <td className="p-3">{patientName}</td>
                      <td className="p-3">{patientDob}</td>
                      <td className="p-3">{new Date(ap.appointmentDate).toLocaleString()}</td>
                      <td className="p-3">{ap.nextDate ? new Date(ap.nextDate).toLocaleString() : '—'}</td>
                      <td className="p-3">{ap.status}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(ap)}
                          className="bg-cyan-300 hover:bg-cyan-400 text-black px-3 py-1 rounded text-sm
                          font-medium transition duration-200 ease-in-out transform hover:scale-105"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ap.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium
                          transition duration-200 ease-in-out transform hover:scale-105"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSave}
          editingAppointment={editInfo}
          initial={initialCreation}
          patients={patients}
        />
      </main>
    </div>
  )
}

export default Appointments