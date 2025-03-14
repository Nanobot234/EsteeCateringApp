import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [testAuth, setTestAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ testAuth, setTestAuth }}>
      {children}
    </AuthContext.Provider>
  );
};