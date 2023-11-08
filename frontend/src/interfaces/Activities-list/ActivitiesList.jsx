import { useEffect, useState } from "react";

import ActivityService from '../../services/Activity/activity.service';


function ActivitiesList() {
  const [activites, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setActivities(await ActivityService.getActivities())
      } catch (e) {
        console.log(e);
      }
    }

    fetchActivities();
  }, [activites]);

  return (
    <div className="activiest-container">
      {activites.map((a) =>{
        <p>{a.name}</p>
      })}
    </div>
  );
}

export default ActivitiesList;