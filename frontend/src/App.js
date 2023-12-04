import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Auth from './interfaces/Auth/Auth';
import Profile from './interfaces/Profile/Profile';
import ActList from './interfaces/Activities-list/ActivitiesList';

import { useContext } from 'react';


import {
  Route,
  Routes,
  BrowserRouter,
  Navigate
} from 'react-router-dom';

import {AuthProvider, AuthContext } from './context/AuthContext/AuthContext';

function App() {
  const userContext = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Auth />} />
          <Route
            path="/profile"
            element={userContext !== 'visit' ? <Profile /> : <Navigate to="/" />}
          />
          <Route path="/activities" element={<ActList />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

function AddProviderApp() {
  return (
    <AuthProvider>
      <App/>
    </AuthProvider>
  );
}

export default AddProviderApp;