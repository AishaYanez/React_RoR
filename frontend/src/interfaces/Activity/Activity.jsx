import { useParams } from "react-router-dom";
import ActivityService from "../../services/Activity/activity.service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

function Activity() {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const userContext = useContext(AuthContext);
  const userData = userContext[3];

  async function fetchActivity() {
    try {
      const fetchedActivity = (await ActivityService.getActivity(id)).data;
      setActivity(fetchedActivity);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchActivity();
  }, []);

  const inscription = () => {
    ActivityService.addClient(id, userData.id).then(r => console.log(r))
  }

  const showActivity = () => {
    return (
      <div className="content-container">
        <div className="images-container">
          <div className="image-activity">
            <img src={activity.image ? activity.image.url : '/Imgs/default_place.png'} alt="Imagen descriptiva de la actividad" />
          </div>
          <div className="image-coordinator">

          </div>
        </div>
        <div className="data-activity">
          <p>{activity.name}</p>
        </div>
        <div>
          <button onClick={inscription}>Inscribirse</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {activity && showActivity()}
    </>
  );
}

export default Activity;