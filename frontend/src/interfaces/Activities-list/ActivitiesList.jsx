import { useEffect, useState, useContext } from "react";
import { SearchOutlined, DeleteOutlined, EditOutlined, AppstoreAddOutlined } from "@ant-design/icons";

import ActivityService from '../../services/Activity/activity.service';
import { AuthContext } from '../../context/AuthContext/AuthContext';

import './ActivitiesList.css';
import FormActivity from "../../components/FormActivity/FormActivity";


function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [statusForm, setStatusForm] = useState('hidden');
  const userContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const fetchedActivities = (await ActivityService.getActivities()).data;
        setActivities(fetchedActivities);
      } catch (e) {
        console.error(e);
      }
    }

    fetchActivities();
  }, []);

  const showSearchBar = () => {
    console.log('seacheBar');
  }
  const showActivityForm = () => {
    setStatusForm('show');
  }
  
  // const editActivity = () => {
  //   setStatusForm('show');
  //   showActivityForm();

  // }

  const showActivities = () => {
    return (
      <>
        {activities.map((a) => (
          <div className="activity-card" key={a.id}>
            <div className="img-container"><img src={a.image ? a.image.url : '/Imgs/default_place.png'} alt="Imagen descriptiva de la actividad" /></div>
            <div className="activity-data">
              <p>{a.name}</p>
              <p>{a.date}</p>
            </div>
            <div className="activity-btns">
              {userContext[0] !== 'admin'
                ? <p className="see-more">Ver +</p>
                : <><DeleteOutlined className="activity-icon" /><EditOutlined onClick={showActivityForm} className="activity-icon" /></>}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="form-activity-container">
        <FormActivity statusForm={statusForm} setStatusForm={setStatusForm} />
      </div>
      <div className="activities-container">
        {activities && showActivities()}
        <div className="icons-container">
          <div className="icon-container">
            <SearchOutlined onClick={showSearchBar} className="icon-float" />
          </div>
          {userContext[0] === 'admin' && <div className="icon-container">
            <AppstoreAddOutlined onClick={showActivityForm} className="icon-float" />
          </div>}
        </div>
      </div>
    </>
  );
}

export default ActivitiesList;