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
      } else {
        setUserStatus('admin');
      }
    }
    setUserData(user);
    console.log(userData);
    console.log(userStatus);
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
