import { useState } from "react";
import Popup from '../../components/PopUp/Popup'

function Profile(user) {
  const [data, setData] = useState({});
  const [popup, setPopup] = useState(false);

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
        method:'changePassword',
        value: 'Submit'
      }
    }
    setData(data);
    
    setPopup(true);
  };
  
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
        method:'deleteAccount',
        value: 'Delete'
      }
    }
    setData(data);

    setPopup(true);
  };

  const closePopup = () => {
    setPopup(popup ? false : true);
  }

  return (
    <div className="profile">
      <div className="settings-container">

      </div>
      <div className='account-data'>
        <p onClick={changePassword} className='danger'>Cambiar contraseña</p>
        {popup && <Popup data={data} closePopup={closePopup} />}
        <p onClick={deleteAccount} className='danger'>Borrar cuenta</p>
      </div>
    </div>
  );
}

export default Profile;