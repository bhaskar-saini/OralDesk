import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const mockUsers = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" },
  { id: "3", role: "Patient", email: "patient2@entnt.in", password: "patient123", patientId: "p2" }
];

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user_obj');
        return stored ? JSON.parse(stored) : null;
    });

    const login = (email, password) => {
        const found = mockUsers.find((u) => u.email === email && u.password === password);
        if (found) {
            setUser(found);
            localStorage.setItem('user_obj', JSON.stringify(found));
            return found;
        }
        return null;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_obj');
    };

    return (
        <AuthContext.Provider value = {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);