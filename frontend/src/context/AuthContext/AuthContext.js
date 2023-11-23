import { createContext } from 'react';

const AuthContext = createContext('NO-AUTHENTICATED');
const UserContext = createContext(null);
const RolContext = createContext('visit');