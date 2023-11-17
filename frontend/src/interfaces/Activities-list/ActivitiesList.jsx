import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import ActivityService from '../../services/Activity/activity.service';

import './ActivitiesList.css';


function ActivitiesList() {
  const [activities, setActivities] = useState([]);

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
          <div className="img-container"><img src={`/Imgs/${a.img}`} alt="Imagen descriptiva de la actividad" /></div>
          <div className="activity-data">
            <p>{a.name}</p>
            <p>{a.date}</p>
          </div>
          <p className="par-btn">Ver +</p>
        </div>
      ))}
      <div className="search-container">
        <SearchOutlined className="search-sym" />
      </div>
    </div>
  );
}

export default ActivitiesList;