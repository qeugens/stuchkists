import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthState = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider
      value={{
        token: token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
