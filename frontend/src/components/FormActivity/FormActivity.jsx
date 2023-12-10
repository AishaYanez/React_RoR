import { useEffect, useState } from 'react';
import UserService from '../../services/User/user.service';
import ActivityService from "../../services/Activity/activity.service";
import './FormActivity.css';

function FormActivity(props) {
  const { activityData, setActivityData, statusForm, setStatusForm } = props;
  const [employees, setEmployees] = useState([]);

  const closeActivityForm = () => {
    setStatusForm('hidden');
  };

  async function fetchEmployees() {
    try {
      const fetchedEmployees = (await UserService.getEmployees()).data;
      setEmployees(fetchedEmployees);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {    
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setActivityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addActivity = () => {
    const newActivity = formattedActivity();
    
    ActivityService.createActivity(newActivity).then( res => console.log('ok')).catch(error => console.error('No ok ' + error));
  };

  const editActivity = () => {
    const activity = formattedActivity();
    let id = activityData.activityId
    
    ActivityService.updateActivity(id, activity).then( res => console.log('ok')).catch(error => console.error(error));
  }

  const formattedActivity = () => {
    return {
      name: activityData.activityName,
      description: activityData.activityDescription,
      date: activityData.activityDate,
      image: activityData.activityImage,
      user_id:activityData.activityCoordinator,
      assistants: [],
      places: activityData.activityPlaces
    };
  }
  
  return (
      <form className={`activity-form ${statusForm}`} action="">
        <h3>Actividad</h3>
        <input onChange={handleInputChange} value={activityData.activityName} name="activityName" type="text" />
        <input onChange={handleInputChange} value={activityData.activityDescription} name="activityDescription" type="text" />
        <input onChange={handleInputChange} value={activityData.activityDate} name="activityDate" type="date" />
        <input onChange={handleInputChange} value={activityData.activityPlaces} name="activityPlaces" type="number" />

        <select onChange={handleInputChange} value={activityData.activityCoordinator} name="activityCoordinator" id="activityCoordinator">
          <option value="" disabled>Coordinador</option>
          {employees && employees.map((e) => (
            <option key={e.id} value={e.id}>{e.nickname}</option>
          ))}
        </select>

        <select onChange={handleInputChange} name="activityAssistants" id="activityAssitants">
          <option value="" disabled>Asistentes</option>
          {employees && employees.map((e) => (
            <option key={e.id} value={e.id}>{e.nickname}</option>
          ))}
        </select>

        <div className='btns'>
          {!activityData.activityId && <input onClick={addActivity} defaultValue='Añadir' className='btn-accept btn' type="button" />}
          {activityData.activityId && <input onClick={editActivity} defaultValue='Editar' className='btn-accept btn' type="button" />}
          <input onClick={closeActivityForm} defaultValue='Cerrar' className='btn-cancel btn' type="button" />
          <span>
          </span>
        </div>
      </form>
  );
}

export default FormActivity;