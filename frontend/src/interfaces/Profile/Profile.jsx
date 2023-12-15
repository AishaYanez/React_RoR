import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext'

import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Switch,
  Upload,
} from 'antd';

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
  // const setUserData = userContext[4];
  const [settings, setSettings] = useState(userData.setting);


  useEffect(() => {
    handleUpdateSettings();
  }, [settings]);

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
          UserService.updateUserPassword(userData.id, credentials).then(res => {
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
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setUserData()
    handleUpdateImage(file);
  };

  const handleUpdateImage = (image) => {
    const formData = new FormData();
    formData.append('user[image]', image);
    UserService.updateUserImage(userData.id, formData).then(r => console.log(r)).catch(err => console.error(err));
  }

  const handleInputSettings = (name, value) => {
    setSettings((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSettings = () => {
    UserService.updateSettings(settings.id, settingsFormData())
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const settingsFormData = () => {
    const formData = new FormData();

    formData.append('setting[font_size]', settings.font_size)
    formData.append('setting[light_mode]', settings.light_mode)
    return formData;
  }

  return (
    <div className="profile">
      <form className="form-user">
        <div className="img-container">
          <Form.Item valuePropName="fileList" >
            <Upload accept="image/*" multiple={false} action="/upload.do" listType="picture-card">
              <div className="img-profile-container">
                <PlusOutlined />
                  <img className="image-profile" src={userData.image ? userData.image.url : '/Imgs/default_user.png'} alt="Foto de perfil de usuario" />
              </div>
            </Upload>
          </Form.Item>
        </div>
        <div className="img-container">
          <img src={userData.image ? userData.image.url : '/Imgs/default_user.png'} alt="Foto de perfil de usuario" />
          <input onChange={handleFileChange} type="file" accept="image/*" multiple={false} />
        </div>
        <div className="settings-container">
          <br />
          <Form.Item label="Modo luminoso:" valuePropName="checked">
            <Switch onChange={(checked) => handleInputSettings('light_mode', checked)} checked={settings.light_mode} type="checkbox" name="light_mode" id="lightMode" />
          </Form.Item>
          <label htmlFor="normalFontSize">Normal:</label>
          <input checked={settings.font_size === 'normal'} onChange={() => handleInputSettings('font_size', 'normal')} type="radio" name="font_size" id="normalFontSize" value="normal" />
          <label htmlFor="BigFontSize">Grande:</label>
          <input checked={settings.font_size === 'big'} onChange={() => handleInputSettings('font_size', 'big')} type="radio" name="font_size" id="BigFontSize" value="big" />
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