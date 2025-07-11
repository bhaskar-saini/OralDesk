import React, { useState } from 'react'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import dentistLogin from '../assets/images/dentist login.png'
import logo from '/logo.svg'
import eyeshow from '../assets/icons/eye_show.svg'
import eyehide from '../assets/icons/eye_hide.svg'

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const result = login(email, password);
            setLoading(false);
            if(result){
                if(result.role === "Admin") {
                    navigate("/admin/dashboard");
                }
                else if(result.role === "Patient") {
                    navigate("/patient/dashboard");
                }
            }
            else{
                setError("Invalid credentials");
            }
        }, 500);
    };

    return(
        <div id='main' className="flex h-screen bg-blue-400 text-gray-800">
            <div id='left' className="w-1/2 p-8 flex flex-col justify-between max-sm:hidden">
                <div id='upper'>
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-7 h-7" />
                        <h1 className="text-2xl font-bold text-white">
                            Oral<span className="text-cyan-300">Desk</span>
                        </h1>
                    </div>
                    <p className="text-sm text-white mt-1 pl-9 italic">
                        One Desk. Every Dental Need.
                    </p>
                </div>
                <div id='lower' className="flex justify-center items-end">
                    <img src={dentistLogin} alt="Dentist Login" className="max-h-[80%] w-auto object-contain mb-10  rounded-3xl shadow-2xl"/>
                </div>
            </div>
            <div id='right' className="w-1/2 flex items-center justify-center bg-white max-sm:w-full">
                <form onSubmit={handleSubmit} className="w-full max-w-sm px-8 flex flex-col gap-4">
                    <div className="bg-blue-400 p-4 flex items-center justify-center rounded-4xl">
                        <h2 className="text-3xl font-extrabold text-center text-white">Welcome To Oral<span className="text-cyan-300">Desk</span></h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-2 text-blue-400">Sign in . Manage . Smile</h2>
                    <input
                     type="email" 
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required 
                     className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="relative">
                        <input
                         type={showPassword ? 'text' : 'password'}
                         placeholder="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         required
                         className="p-3 pr-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2">
                            <img src={showPassword ? eyehide : eyeshow} className="w-5 h-5" alt="eye"/>
                        </div>
                    </div>
                    <button
                        type="submit" 
                        disabled = {loading} 
                        className="bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition max-w-24"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>               
                    {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Login