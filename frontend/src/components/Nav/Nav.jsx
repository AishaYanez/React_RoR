import AuthService from '../../services/Auth/auth.service';
import { Link, useNavigate } from 'react-router-dom';

import './Nav.css';
import { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext/AuthContext';

function Nav() {
  const nav = useNavigate();
  const userStatus = useContext(AuthContext);

  const logoutActions = () => {
    nav('/auth')
    userStatus[2]();
    localStorage.removeItem('token');
    localStorage.removeItem('lastLoginTime');
  };
  
  const logOut = () => {
    if (localStorage.getItem('token') != null) {
      AuthService.logoutUser()
      .then(r => {
          console.log(r);
          logoutActions();
        })
        .catch(e => console.error(e))
    } else {
      console.error('Token didn\'t exist');
    }
  }

  return (
    <nav>
      <ul>
        <li className='profile-link'>
          <Link to='/profile' className='link'>
            <div className='icon-container'></div>
            <p>Perfil</p>
          </Link>
        </li>
        <li className='contact-link'>
          <Link className='link'>
            <div className='icon-container'></div>
            <p>Contactar</p>
          </Link>
        </li>
        <li className='activities-link'>
          <Link to="/activities" className='link'>
            <div className='icon-container'></div>
            <p>Actividades</p>
          </Link>
        </li>
        <li onClick={logOut}>
          <div className='link'>
            <div className='icon-container'></div>
            <p>Log Out</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;