import React, { useState } from 'react';
import './Popup.css';

import {
  QuestionCircleOutlined as Question,
  ExclamationCircleOutlined as Exclamation
} from "@ant-design/icons";

function Popup(props) {
  const [formError, setFormError] = useState(false);

  const close = () => {
    setFormError(false);
    props.closePopup();
  };

  const validateInput = () => {
    let condition = formError;
    document.getElementsByName('input').forEach((i) => {
      while (!condition) {
        if (i.value === "" || i.value.includes(' ')) {
          condition = true;
          setFormError(true);
        }
      }
    });
  };

  const deleteAccount  = () => {

  };

  const changePassword = () => {

  };

  return (
    <form className='popup-container'>
      {props.data.icon === 'question' && <Question className='question'/>}
      {props.data.icon === 'danger' && <Exclamation className='danger'/>}
      <p>{props.data.title}</p>
      {formError && <span>{props.data.error}</span>}
      {props.data.input.map((i, index) => (
        <React.Fragment key={index}>
          <input  type={i.type} name='input' placeholder={i.placeholder} required={i.required}/>
        </React.Fragment>
      ))}
      <input onClick={validateInput} type='button' className="btn-accept" defaultValue={props.data.button.value} readOnly/>
      <input type='button' className="btn-close" onClick={close} defaultValue='Cancel' readOnly/>
    </form>
  );
}

export default Popup;