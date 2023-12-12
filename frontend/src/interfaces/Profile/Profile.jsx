import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext'

import Popup from '../../components/PopUp/Popup'
import './Profile.css';
import AuthService from "../../services/Auth/auth.service";
import UserService from "../../services/User/user.service";

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
          let credentials = btoa(`${val[0]}:${val[1]}`);
          UserService.updateUser(userData.id, credentials).then(res => {
            nav('/auth');
            closePopup()
          }
          ).catch(err => console.error(err))
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
          AuthService.deleteAccount().then(res => {
            nav('/auth');
            localStorage.removeItem('token');
            closePopup()
          }
          ).catch(err => console.error(err))
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

  const handleFileChange = () => {
    
  }

  return (
    <div className="profile">
      <form>
      <input onChange={handleFileChange} type="file" accept="image/*" multiple={false}/>
      <div className="settings-container">
      </div>
      </form>
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