import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Auth from './interfaces/Auth/Auth';
import Profile from './interfaces/Profile/Profile';

import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;