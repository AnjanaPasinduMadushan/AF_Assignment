import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8070/User/profile', { withCredentials: true });
      setUserData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};