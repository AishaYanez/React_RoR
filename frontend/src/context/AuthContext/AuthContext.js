import {
  createContext,
  // useContext, 
  useState
} from 'react';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [userStatus, setUserStatus] = useState('visit');
  const [userData, setUserData] = useState();

  const loginContext = (user) => {
    console.log(user);
    if (!user.email.includes('@stillhigher.es')) {
      setUserStatus('client');
    } else {
      if (!user.admin) {
        setUserStatus('employee');
        console.log('employee');
      } else {
        console.log('admin');
        setUserStatus('admin');
      }
    }
    setUserData(user);
  };

  const logoutContext = () => {
    setUserStatus('visit');
  };

  return (
    <AuthContext.Provider value={[userStatus, loginContext, logoutContext]}>
      {children}
    </AuthContext.Provider>
  );
};
