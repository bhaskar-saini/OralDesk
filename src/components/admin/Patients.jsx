import React, {useState, useEffect} from 'react'
import Sidebar from "./Sidebar"
import { Add } from "@mui/icons-material"
import PatientModal from "./PatientModal";

const Patients = () => {
  //localStorage.clear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("patients");
    try{
      if (storedData) {
        setPatients(JSON.parse(storedData));
      }
      else{
        setPatients([]);
      }
    }
    catch(e) {
      console.error("Error parsing patients:",e);
      localStorage.removeItem("patients");
      setPatients([]);
    }
  },[]);

  const saveInStorage = (updated) => {
    localStorage.setItem("patients", JSON.stringify(updated));
    setPatients(updated);
  };

  const handleAddClick = () => {
    setEditPatient(null);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const getNextId = () => {
    const storedId = localStorage.getItem("idCounter");
    const currentId = storedId ? parseInt(storedId) : 1;
    localStorage.setItem("idCounter", (currentId + 1).toString());
    return currentId.toString();
  };
  const handleSavePatient = (data) => {
    let updated;
    if(editPatient) {
      updated = patients.map(p => 
        p.id === editPatient.id ? {...data, id: editPatient.id} : p
      );
    }
    else{
      const newPatient = { id: getNextId(), ...data };
      updated = [newPatient, ...patients];
    }
    saveInStorage(updated);
    handleModalClose();
  };

  const handleEdit = (patient) => {
    setEditPatient(patient);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updated = patients.filter(p => p.id !== id);
    saveInStorage(updated);
  };

  return (
    <div className="flex bg-blue-100">
      <Sidebar/>
      <main className="flex-1 p-4">
        <h1 className="mt-2 p-3 text-2xl text-gray-700 font-bold">Patient Management</h1>
        <button className="flex gap-1 ml-4 cursor-pointer transition-all bg-indigo-500 text-white font-bold
         px-3 py-1 rounded-lg border-indigo-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
         hover:border-b-[6px] 
         active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" 
         onClick={handleAddClick}
        >
          <Add fontSize="small"/>
          Add Patient
        </button>

        <div className="mt-5 overflow-x-auto mx-4">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="p-3 text-left">PID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Health Info</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No patients found.
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id} className="border-b last:border-b-0 even:bg-gray-50">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3">{p.patientName}</td>
                    <td className="p-3">{p.dob}</td>
                    <td className="p-3">{p.contact}</td>
                    <td className="p-3 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {p.healthInfo}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-cyan-300 hover:bg-cyan-400 text-black px-3 py-1 rounded text-sm
                         font-medium transition duration-200 ease-in-out transform hover:scale-105"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium
                         transition duration-200 ease-in-out transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <PatientModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose}
          onSave={handleSavePatient}
          editPatient={editPatient} 
        />
      </main>
    </div>
  )
}

export default Patients