import './Popup.css';

import {
  QuestionCircleOutlined as Question,
  ExclamationCircleOutlined as Exclamation
} from "@ant-design/icons";

function Popup(props) {

  const close = () => {
    props.closePopup();
  };

  const validateInput = () => {

  };

  return (
    <form className='popup-container'>
      {props.data.icon === 'question' && <Question className='question'/>}
      {props.data.icon === 'danger' && <Exclamation className='danger'/>}
      <p>{props.data.title}</p>
      {props.data.input.map((i) => (
        <input placeholder={i.placeholder} required={i.required}/>
      ))}
      <input type='button' className="btn-accept" onClick={validateInput} defaultValue='Accept' readOnly/>
      <input type='button' className="btn-close" onClick={close} defaultValue='Cancel' readOnly/>
    </form>
  );
}

export default Popup;