import './Popup.css';

import {
  QuestionCircleOutlined as Question,
  ExclamationCircleOutlined as Exclamation
} from "@ant-design/icons";

function Popup(props) {
  const close = () => {
    props.closePopup();
  }

  return (
    <form>
      <Question />
      <Exclamation />
      <input className="btn-close" onClick={close} defaultValue='Cancel' readOnly/>
      <p>{props.data.title}</p>
    </form>
  );
}

export default Popup;