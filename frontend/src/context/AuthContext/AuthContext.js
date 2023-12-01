import {
  createContext,
  // useContext, 
  useState
} from 'react';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [userStatus, setUserStatus] = useState('visit');

  const loginContext = (user) => {
    if (user.email.exclude('@stillhigher.es')) {
      setUserStatus('client');
    } else {
      if (!user.admin) {
        setUserStatus('employee');
      } else {
        setUserStatus('admin');
      }
    }
  };

  const logoutContext = () => {
    setUserStatus('visit');
  };

  return (
    <AuthContext.Provider value={userStatus}>
      {children}
    </AuthContext.Provider>
  );
};

// const useAuth = () => {
//   const userContext = useContext(AuthProvider);
//   return userContext;
// }


// export { AuthProvider, AuthContext}