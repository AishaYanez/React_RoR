import { useEffect, useState, useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";

import ActivityService from '../../services/Activity/activity.service';
import { AuthContext } from '../../context/AuthContext/AuthContext';

import './ActivitiesList.css';


function ActivitiesList() {
  const [activities, setActivities] = useState([]);
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

  return (
    <div className="activities-container">
      {activities && activities.map((a) => (
        <div className="activity-card" key={a.id}>
          <div className="img-container"><img src={a.image ? a.image.url : '/Imgs/default_place.png'} alt="Imagen descriptiva de la actividad" /></div>
          <div className="activity-data">
            <p>{a.name}</p>
            <p>{a.date}</p>
          </div>
         {userContext === 'admin' ?  <p className="par-btn">hola</p> :  <p className="par-btn">Ver +</p>}
        </div>
      ))}
      <div className="search-container">
        <SearchOutlined className="search-sym" />
      </div>
    </div>
  );
}

export default ActivitiesList;