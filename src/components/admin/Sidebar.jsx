import {React,useEffect,useState} from 'react'
import logo from '/logo.svg'
import {ChevronLeft, ChevronRight, Dashboard, Person, BookOnline, CalendarMonth, Logout} from '@mui/icons-material';
import { NavLink } from "react-router-dom";
import {useAuth} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(() => {
    const openStatus = localStorage.getItem('isOpen');
    return openStatus ? JSON.parse(openStatus) : true;
  });

  useEffect(()=>{
    localStorage.setItem('isOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  const listItems = [
    {id:'1', name: 'Dashboard', icon: Dashboard, to: '/admin/dashboard'},
    {id:'2', name: 'Patients', icon: Person, to: '/admin/patients'},
    {id:'3', name: 'Appointments', icon: BookOnline, to: '/admin/appointments'},
    {id:'4', name: 'Calendar', icon: CalendarMonth, to: '/admin/calendar'},
  ];
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`min-h-screen bg-blue-400 text-white flex flex-col p-4 transition-all duration-300
     ease-in-out ${isOpen ? 'w-54' : 'w-20'}`}>
      <div id="top" className={`flex ${isOpen ? 'justify-between' : 'justify-center'} items-center mb-6`}>
        <div className={`flex items-center gap-2 ${!isOpen && 'hidden'}`}>
          <img src={logo} alt="logo" className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-white pt-2">
            Oral<span className="text-cyan-300">Desk</span>
          </h1>
        </div>
        <button onClick={toggleSidebar} className={`
            p-1 rounded-full hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200
            ${isOpen ? 'justify-end' : 'justify-center'} md:block hidden
          `}
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5 cursor-pointer" />
          ) : (
            <ChevronRight className="w-5 h-5 cursor-pointer" />
          )}
        </button>
      </div>
      <nav>
        <ul>
          {listItems.map((item) => (
            <li key={item.id} className="mb-2">
              <NavLink
               to={item.to}
               className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg
                  transition-colors duration-200 ease-in-out
                  ${isActive
                    ? 'bg-blue-500 font-semibold'
                    : 'hover:bg-blue-300'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className={`text-lg ${!isOpen && 'hidden'}`}>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div id="logout" className="mt-auto pt-4">
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3 p-3 rounded-lg w-full
            text-white hover:bg-blue-300 cursor-pointer
            transition-colors duration-200 ease-in-out
          "
        >
          <Logout className="w-5 h-5" />
          <span className={`text-lg ${!isOpen && 'hidden'}`}>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar