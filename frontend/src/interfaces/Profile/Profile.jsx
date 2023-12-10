import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext/AuthContext'

import Popup from '../../components/PopUp/Popup'
import './Profile.css';
import AuthService from "../../services/Auth/auth.service";

function Profile() {
  
  const nav = useNavigate();
  
  const [data, setData] = useState({});
  const [popup, setPopup] = useState(false);
  const userContext = useContext(AuthContext);
  const userData = userContext[3];

  //Create PopUp for change password
  const changePassword = () => {
    let data = {
      title: 'Introduce tu contraseña y tu nueva contraseña',
      icon: 'question',
      input: [
        {
          placeholder: 'Contraseña',
          required: true,
          type: 'password',
          error: 'El campo no puede estar vacio'
        },
        {
          placeholder: 'Nueva contraseña',
          required: true,
          type: 'password',
          error: 'El campo no puede estar vacio'
        }
      ],
      button: {
        method: (val) => {
          console.log('change');
          console.log(val[0]);
          console.log(val[1]);
        },
        value: 'Cambiar'
      }
    }
    setData(data);
    setPopup(true);
  };

  //Creation PopUp for delete account
  const deleteAccount = () => {
    let data = {
      title: '¿Estás seguro/a?',
      description: 'Está acción no se puede cambiar',
      icon: 'danger',
      input: [
        {
          placeholder: 'Contraseña',
          required: true,
          type: 'password',
          error: 'El campo no puede estar vacio'
        }
      ],
      button: {
        method: (val) => {
          console.log('delete');
          console.log(val[0]);
          AuthService.deleteAccount().then(
            nav('/auth')
            ).catch(err => console.error(err))
          closePopup()
        },
        value: 'Borrar'
      }
    }
    setData(data);
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  }

  return (
    <div className="profile">
      <div className="settings-container">
      </div>
      <div className='account-data'>
        <p onClick={changePassword} className='data-change'>Cambiar contraseña</p>
        <p onClick={deleteAccount} className='data-change'>Borrar cuenta</p>
      </div>
      <div className="popup-container">
        {popup && <Popup data={data} closePopup={closePopup} />}
      </div>
    </div>
  );
}

export default Profile;