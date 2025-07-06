import React, { useEffect, useState } from 'react'

const PatientModal = ({isOpen, onClose, onSave, editPatient}) => {
  const [patientData, setPatientData] = useState({
    patientName : '',
    dob: '',
    contact: '',
    healthInfo:''
  });

  useEffect(()=>{
    if(isOpen && editPatient) {
      setPatientData({
        patientName: editPatient.patientName || '',
        dob: editPatient.dob || '',
        contact: editPatient.contact || '',
        healthInfo: editPatient.healthInfo || ''
      });
    }
  },[isOpen, editPatient]);

  if (!isOpen) return null;
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setPatientData((prevData) =>({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(patientData);
    setPatientData({
      patientName: '',
      dob: '',
      contact: '',
      healthInfo: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-gray-700">
      <div className="bg-blue-100 rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100 opacity-100">
        <div id="modal-header" className="w-full h-16 flex items-center justify-between px-5 bg-blue-50">
          <h2 className="text-lg font-semibold">{editPatient ? 'Edit Patient' : 'Create Patient'}</h2>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-2 py-1 rounded-3xl text-xs font-semibold text-black bg-gray-400 hover:bg-gray-500 cursor-pointer
              transition-colors duration-200 ease-in-out">
              CANCEL
            </button>
            <button
              form="newPatientForm"
              type="submit"
              className="px-3 py-1 rounded-3xl text-xs font-semibold text-white bg-green-500 hover:bg-green-600 cursor-pointer
              transition-colors duration-200 ease-in-out">
                {editPatient ? 'SAVE' : 'CREATE'}
            </button>
          </div>
        </div>
        <h2 className="font-bold text-gray-800 mt-1 mb-3 text-center">Enter Patient Details</h2>

        <form id="newPatientForm" onSubmit={handleSubmit} className="px-5 pb-5 flex flex-col gap-3">
          <div className="flex items-center">
            <label htmlFor="patientName" className="block w-1/3">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={patientData.patientName}
              onChange={handleChange}
              className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="dob" className="block w-1/3">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={patientData.dob}
              onChange={handleChange}
              className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              required
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="contact" className="block w-1/3">Contact Number</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={patientData.contact}
              onChange={handleChange}
              className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="e.g,+91-9988776655"
              required
            />
          </div>
          <div>
            <label htmlFor="healthInfo" className="block">Health Info</label>
            <textarea
              id="healthInfo"
              rows="4"
              name="healthInfo"
              value={patientData.healthInfo}
              onChange={handleChange}
              className="text-sm w-full px-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Past Medical History"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PatientModal