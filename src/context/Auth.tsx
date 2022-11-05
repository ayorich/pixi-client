import { useState, ReactNode } from 'react';

import { createContext, useContext } from 'react';

type authTypes = {
  user: any;
  authenticated: boolean;
  setUser: React.Dispatch<any>;
};

const AuthContext = createContext<authTypes>({
  authenticated: false,
  user: null,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const userData = sessionStorage.getItem('naya_user') || '';
  const [user, setUser] = useState<any | null>(
    userData ? JSON.parse(userData) : null
  );

  return (
    <AuthContext.Provider
      value={{
        user: user,
        authenticated: !!user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
