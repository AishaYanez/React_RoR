import UserService from '../../services/User/user.service';
import './Singup.css';

import { useState } from "react";

function Singup({changeForm}) {

  const [newUser, setNewUser] = useState({ newNickname: "", newEmail: "", newPassword: "", passwordRepeat:"" });
  const [voidError, setVoidError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const updateData = () => {
    setNewUser({
      newNickname: document.getElementById('newNickname').value || "",
      newEmail: document.getElementById('newEmail').value || "",
      newPassword: document.getElementById('newPassword').value || "",
      passwordRepeat: document.getElementById('passwordRepeat').value || ""
    });
  }

  ////////    VALIDACION DEL FORM     //////////
  const validatePassword = (error) => {
    if (newUser.newPassword !== newUser.passwordRepeat) {
      setPasswordError("Las contraseñas no son iguales");
      error = true;

    } else {
      setPasswordError("");
    }

    return error;
  }

  const validateEmailEstructure = (error) => {
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    
    if (!emailRegex.test(newUser.newEmail)) {
      setEmailError("La estructura de esté correo no es válida. Ex: user@example.com");
      error = true;
      
    } else {
      setEmailError("");
    }

    return error;
  }

  const validateVoid = (error) => {

    if (newUser.newNickname === "" || newUser.newEmail === ""
    ||newUser.newPassword === "" ||newUser.passwordRepeat === "") {
      setVoidError('Rellena todos los campos');
      error = true;

    } else {
      setVoidError("");
    }

    return error;
  }

  const validateInputs = () => {
    let errorInputs = false;

    errorInputs = validateVoid(errorInputs);
    errorInputs = validateEmailEstructure(errorInputs);
    errorInputs = validatePassword(errorInputs);

    if (!errorInputs) {
      submitUser();
    }
  }

  /////////////////////

  const submitUser = () => {
    let data = new FormData();
    data.append('user[nickname]',newUser.newNickname);
    // data.append('user[clave]`',`${newUser.newEmail}.${newUser.newPassword}`);
    data.append('user[email]',newUser.newEmail)
    data.append('user[password]',newUser.newPassword)
    
    UserService.createUser(data).then(r => {
      console.log(r);
      changeForm();
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <>
      <h2>Sing Up</h2>
      <form >
        <span>{voidError}</span>
        <input placeholder='Nickname' id='newNickname'  onChange={updateData} type='text' value={newUser.nickname} />
        <span>{}</span>
        <input placeholder='Email' id='newEmail' onChange={updateData} type='email' value={newUser.newEmail} />
        <span>{emailError}</span>
        <input placeholder='Contraseña' id='newPassword' onChange={updateData} type='password' value={newUser.newPassword} />
        <input placeholder='Repite contraseña' id='passwordRepeat' onChange={updateData} type='password' value={newUser.passwordRepeat} />
        <span>{passwordError}</span>
        <input className='btn-submit' onClick={validateInputs} defaultValue='Crear cuenta' type='button' />
      </form>
    </>
  );
}

export default Singup;