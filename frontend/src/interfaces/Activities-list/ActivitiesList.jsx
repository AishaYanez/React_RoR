import { useEffect, useState, useContext } from "react";
import { SearchOutlined, DeleteOutlined, EditOutlined, AppstoreAddOutlined } from "@ant-design/icons";

import ActivityService from '../../services/Activity/activity.service';
import { AuthContext } from '../../context/AuthContext/AuthContext';

import './ActivitiesList.css';
import FormActivity from "../../components/FormActivity/FormActivity";


function ActivitiesList() {
  const [activityData, setActivityData] = useState({
  });
  const [activities, setActivities] = useState([]);
  const [statusForm, setStatusForm] = useState('');
  const userContext = useContext(AuthContext);

  async function fetchActivities() {
    try {
      const fetchedActivities = (await ActivityService.getActivities()).data;
      setActivities(fetchedActivities);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {    
    fetchActivities();
  }, []);

  const showSearchBar = () => {
    console.log('seacheBar');
  }

  const dateOfToday = () => {
    const today = new Date();

    const formattedToday = `${today.getFullYear()}-${
      (today.getMonth() + 1).toString().padStart(2, '0')
    }-${today.getDate().toString().padStart(2, '0')}`;

    return formattedToday;
  }

  const showActivityForm = () => {
    setActivityData({
      id: null,
      name: "",
      description: "",
      date: dateOfToday(),
      image: null,
      user_id:0,
      assistants: [],
      places: 0
  });
    setStatusForm('show');
  }

  const editActivity = (activity) => {
    setActivityData({
      id: activity.id,
      name: activity.name,
      description: activity.description,
      date: activity.date,
      image: activity.image,
      user_id:activity.coordinator.id,
      assistants: activity.assistants,
      places: activity.places
  });
    setStatusForm('show');
  }

  const deleteActivity = (id) => {
    ActivityService.deleteActivity(id).then(res => fetchActivities()).catch(err => console.error(err))
  }

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
                : <><DeleteOutlined onClick={() => deleteActivity(a.id)} className="activity-icon" />
                <EditOutlined onClick={() => editActivity(a)} className="activity-icon" /></>}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="activity-content">
      <div className="form-activity-container">
        <FormActivity activityData={activityData} statusForm={statusForm} setStatusForm={setStatusForm} />
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
      </div>
    </>
  );
}

export default ActivitiesList;