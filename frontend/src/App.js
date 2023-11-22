import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Auth from './interfaces/Auth/Auth';
import Profile from './interfaces/Profile/Profile';
import ActList from './interfaces/Activities-list/ActivitiesList';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/activities" element={<ActList/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;