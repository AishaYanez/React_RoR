import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import '../SingUp/Singup.css'
import AuthService from '../../services/Auth/auth.service';


function Login() {
  const nav = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [voidLoginError, setVoidError] = useState("");

  const changeData = () => {
    setUser({
      email: document.getElementById('email').value || "",
      password: document.getElementById('password').value || ""
    });
  }

  ////////     VALIDATE FORM PRE-POST      ////////

  const validateVoid = (error) => {

    if (user.email === "" || user.password === "") {
      setVoidError("Rellena todos los campos");
      error = true;

    } else {
      setVoidError("");
    }

    return error;
  }

  const validateInputs = () => {
    let errorInputs = false;

    errorInputs = validateVoid(errorInputs);

    if (!errorInputs) {
      submitUser();
    }
  }

  ///////////////////////////////////

  const submitUser = () => {
    let credentials =  btoa(`${user.email}:${user.password}`);

    AuthService.loginUser(credentials)
    .then(r => {
      nav('/profile')
      console.log(r.data);
    }).catch(e => {
      console.error(e);
    });
  }

  return (
    <>
      <h2>Log In</h2>
      <form >
        <span>{voidLoginError}</span>
        <input placeholder='Email' id="email" onChange={changeData} type="email" value={user.email} />
        <input placeholder='Contraseña' id="password" onChange={changeData} type="password" value={user.password} />
        <input className='btn-submit' onClick={validateInputs} defaultValue="Iniciar sesión" type="button" />
      </form>
    </>
  );
}

export default Login;