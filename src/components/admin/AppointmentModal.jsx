import React, { useEffect, useState, useRef } from 'react'
import { AttachFile } from "@mui/icons-material";

const AppointmentModal = ({isOpen, onClose, onSave, editingAppointment, initial, patients}) => {
    const[appointmentData, setAppointmentData] = useState({
        pid: '',
        title: '',
        description: '',
        comments: '',
        appointmentDate: '',
        cost: '',
        status: 'Pending',
        nextDate: '',
        files: []
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (editingAppointment) {
                setAppointmentData({
                    pid: editingAppointment.pid || '',
                    title: editingAppointment.title || '',
                    description: editingAppointment.description || '',
                    comments: editingAppointment.comments || '',
                    appointmentDate: editingAppointment.appointmentDate ? editingAppointment.appointmentDate.substring(0, 16) : '',
                    cost: editingAppointment.cost || '',
                    status: editingAppointment.status || 'Pending',
                    nextDate: editingAppointment.nextDate ? editingAppointment.nextDate.substring(0, 16) : '',
                    files: editingAppointment.files && editingAppointment.files.length > 0
                        ? editingAppointment.files
                        : []
                });
            } else {
                setAppointmentData({
                    pid: '',
                    title: '',
                    description: '',
                    comments: '',
                    appointmentDate: '',
                    cost: '',
                    status: 'Pending',
                    nextDate: '',
                    files: []
                });
            }
        }
    }, [isOpen, editingAppointment]);
    
    if(!isOpen) return null;
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setAppointmentData((prevData) => ({
                    ...prevData,
                    files: [
                        ...prevData.files,
                        {
                            name: selectedFile.name,
                            type: selectedFile.type,
                            base64: base64String
                        }
                    ]
                }));
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const handleAttachFileClick = () => {
        fileInputRef.current.click();
    };

    const reconstructDataUrl = (file) => {
        if (file.base64 && file.type) {
            return `data:${file.type};base64,${file.base64}`;
        }
        return '#';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...appointmentData,
        };
        if (editingAppointment && editingAppointment.id) {
            dataToSave.id = editingAppointment.id;
        }
        onSave(dataToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-gray-700">
            <div className="bg-blue-100 rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto transform
             transition-all duration-300 ease-out scale-100 opacity-100">
                <div id="modal-header" className="w-full h-16 flex items-center justify-between px-5 bg-blue-50">
                <h2 className="text-lg font-semibold">Create Appointment</h2>
                <div className="flex gap-2">
                    <button 
                    type="button"
                    onClick={onClose}
                    className="px-2 py-1 rounded-3xl text-xs font-semibold text-black bg-gray-400 hover:bg-gray-500 cursor-pointer
                    transition-colors duration-200 ease-in-out">
                    CANCEL
                    </button>
                    <button
                    form="appointmentForm"
                    type="submit"
                    className="px-3 py-1 rounded-3xl text-xs font-semibold text-white bg-green-500 hover:bg-green-600 cursor-pointer
                    transition-colors duration-200 ease-in-out">
                        {editingAppointment ? 'SAVE' : 'CREATE'}
                    </button>
                </div>
                </div>
                <h2 className="font-bold text-gray-800 mt-1 mb-3 text-center">Enter Appointment Details</h2>

                <form id="appointmentForm" onSubmit={handleSubmit} className="px-5 pb-5 flex flex-col gap-3">
                    <div className="flex items-center">
                        <label htmlFor="pid" className="block w-1/3">PID</label>
                        <select name="pid" value={appointmentData.pid} onChange={handleChange}>
                            <option value="">Select Patient</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.patientName} (PID: {p.id})</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="title" className="block w-1/3">Title</label>
                        <input
                         type="text"
                         id="title"
                         name="title"
                         value={appointmentData.title}
                         onChange={handleChange}
                         className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none
                         focus:ring-1 focus:ring-gray-500"
                         required
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="description" className="block w-1/3">Description</label>
                        <input
                         type="text"
                         id="description"
                         name="description"
                         value={appointmentData.description}
                         onChange={handleChange}
                         className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none
                         focus:ring-1 focus:ring-gray-500"
                         required
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="comments" className="block w-1/3">Comments</label>
                        <input
                         type="text"
                         id="comments"
                         name="comments"
                         value={appointmentData.comments}
                         onChange={handleChange}
                         className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none
                         focus:ring-1 focus:ring-gray-500"
                         required
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="appointmentDate" className="block w-1/3">Appointment</label>
                        <input
                         type="datetime-local"
                         id="appointmentDate"
                         name="appointmentDate"
                         value={appointmentData.appointmentDate}
                         onChange={handleChange}
                         className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none
                         focus:ring-1 focus:ring-gray-500"
                         required
                        />
                    </div>
                    {!initial && (
                        <>
                            <div className="flex items-center">
                                <label htmlFor="cost" className="block w-1/3">Cost ($)</label>
                                <input
                                type="text"
                                id="cost"
                                name="cost"
                                value={appointmentData.cost}
                                onChange={handleChange}
                                className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none
                                focus:ring-1 focus:ring-gray-500"
                                required
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="status" className="block w-1/3">Status</label>
                                <select
                                type="text"
                                id="status"
                                name="status"
                                value={appointmentData.status}
                                onChange={handleChange}
                                className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none
                                focus:ring-1 focus:ring-gray-500"
                                required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="nextDate" className="block w-1/3">Next Appointment</label>
                                <input
                                type="datetime-local"
                                id="nextDate"
                                name="nextDate"
                                value={appointmentData.nextDate}
                                onChange={handleChange}
                                className="w-2/3 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none
                                focus:ring-1 focus:ring-gray-500"
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="app_date" className="block w-1/3">Add Files</label>
                                <button onClick={handleAttachFileClick} type="button">
                                    <AttachFile/>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {appointmentData.files.length > 0 && (
                                    <div>
                                        <h4 className="pl-2">Uploaded Files:</h4>
                                        <ul>
                                            {appointmentData.files.map((file, index) => (
                                                <li key={index}>
                                                    <a
                                                        href={reconstructDataUrl(file)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pl-2"
                                                        download={file.name}
                                                    >
                                                        {file.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}

export default AppointmentModal