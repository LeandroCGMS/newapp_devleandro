
import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <GlobalContext.Provider value={{ username, password, setUsername, setPassword, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
