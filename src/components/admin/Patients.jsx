import React, {useState} from 'react'
import Sidebar from "./Sidebar"
import { Add } from "@mui/icons-material"
import NewPatientModal from "./NewPatientModal";

const Patients = () => {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const handleNewPatientClick = () => {
    setIsNewModalOpen(true);
  };
  const handleNewPatientClose = () => {
    setIsNewModalOpen(false);
  };
  const handleSaveNewPatient = () => {
    handleNewPatientClose();
  };

  return (
    <div className="flex bg-blue-100">
      <Sidebar/>
      <main>
        <h1 className="mt-2 p-3 text-2xl font-bold">Patient Management</h1>
        <button className="flex gap-1 ml-4 cursor-pointer transition-all bg-indigo-500 text-white font-bold
         px-3 py-1 rounded-lg border-indigo-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
         hover:border-b-[6px] 
         active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" 
         onClick={handleNewPatientClick}
        >
          <Add fontSize="small"></Add>
          Add Patient
        </button>
        <NewPatientModal isOpen={isNewModalOpen} onClose={handleNewPatientClose} onSave={handleSaveNewPatient}></NewPatientModal>
      </main>
    </div>
  )
}

export default Patients