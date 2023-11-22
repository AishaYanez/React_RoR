import AuthService from '../../services/Auth/auth.service';
import { Link, useNavigate } from 'react-router-dom';

import './Nav.css';

function Nav() {
  const nav = useNavigate();

  const logOut = () => {
    if (localStorage.getItem('token') != null) {
      AuthService.logoutUser()
        .then(r => {
          console.log(r);
          nav('/auth')
          localStorage.removeItem('token');
          localStorage.removeItem('lastLoginTime');
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