import { useEffect, useState } from "react";

import ActivityService from '../../services/Activity/activity.service';


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
        <p key={a.id}>{a.name}</p>
      ))}
    </div>
  );
}

export default ActivitiesList;