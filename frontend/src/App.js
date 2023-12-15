import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Auth from './interfaces/Auth/Auth';
import Profile from './interfaces/Profile/Profile';
import ActList from './interfaces/Activities-list/ActivitiesList';

import { useContext, useEffect } from 'react';


import {
  Route,
  Routes,
  BrowserRouter,
  Navigate
} from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext/AuthContext';
import AuthService from './services/Auth/auth.service';
import Activity from './interfaces/Activity/Activity';

function App() {
  const userContext = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      AuthService.checkAuth().then(res => {
        userContext[1](res);
      }).catch(
        err => console.error(err)
      );
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Auth />} />
          <Route
            path="/profile"
            element={userContext[0] !== 'visit' ? <Profile /> : <Navigate to="/" />}
          />
          <Route path="/activities" element={<ActList />} />
          <Route path='/activity/:id' element={<Activity/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

function AddProviderApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AddProviderApp;