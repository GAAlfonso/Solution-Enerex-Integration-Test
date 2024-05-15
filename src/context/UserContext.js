// UserContext.js

import React, { createContext, useState } from 'react';
import { updateAxiosToken } from 'services/Api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('authToken'));

  const login = (data) => {
    sessionStorage.setItem('authToken', data);
    setAuthToken(data);
    updateAxiosToken(data);
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    setAuthToken(null);
    
  };

  return (
    <UserContext.Provider value={{ authToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
