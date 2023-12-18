import { useParams } from "react-router-dom";
import ActivityService from "../../services/Activity/activity.service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import './Activity.css';

function Activity() {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const userContext = useContext(AuthContext);
  const userData = userContext[3];

  const fetchActivity = async() => {
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
    let formData = new FormData();

    formData.append('client_id', userData.id)
    ActivityService.addClient(id, formData).then(r => console.log(r)).catch(err => console.error(err))
  }

   const showActivity = () => {
    return (
      <div className="content-container">
        <div className="image-container">
            <img src={activity.image ? activity.image.url : '/Imgs/default_place.png'} alt="Imagen descriptiva de la actividad" />
          {activity.coordinator && <div className="image-coordinator">
            <img src={activity.coordinator.image ? activity.coordinator.image.url: '/Imgs/default_user.png'} alt="Imagen de perfil del coordinador" />
          </div> }
        </div>
        <div className="data-activity">
          <p>{activity.name}</p>
          <p>{activity.description}</p>
        </div>
        <div>
          {userData && <button className="btn-submit btn-activity" onClick={inscription}>Inscribirse</button>}
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