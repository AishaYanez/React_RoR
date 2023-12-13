import { useEffect, useState } from 'react';
import UserService from '../../services/User/user.service';
import ActivityService from "../../services/Activity/activity.service";
import './FormActivity.css';

function FormActivity(props) {
  const { activityData, setActivityData, statusForm, setStatusForm, fetchActivities } = props;
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setActivityData((prevData) => ({
      ...prevData,
      activityImage: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addActivity = () => {
    const newActivity = formattedActivity();
    ActivityService.createActivity(newActivity).then( res => {
      console.log('ok');
      fetchActivities();
      setStatusForm('');
  }).catch(error => console.error('No ok ' + error));
  };

  const editActivity = async () => {
    const activity = formattedActivity();
    let id = activityData.activityId
    
    ActivityService.updateActivity(id, activity).then( res => {
      console.log(res);
      fetchActivities();
      setStatusForm('');
    }).catch(error => console.error(error));
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
      <form className={`activity-form ${statusForm}`}>
        <h3>Actividad</h3>
        <label className='activity-label label-one' htmlFor='activityName'>Nombre</label>
        <input className='input-one' onChange={handleInputChange} value={activityData.activityName} id='activityName' name="activityName" type="text" />
        <label className='activity-label label-two' htmlFor='activityDescription'>Descripción</label>
        <input className='input-two' onChange={handleInputChange} value={activityData.activityDescription} id="activityDescription" name="activityDescription" type="text" />
        <label className='activity-label label-three' htmlFor='activityDate'>Fecha</label>
        <input className='input-three' onChange={handleInputChange} value={activityData.activityDate} id='activityDate' name="activityDate" type="date" />
        <label className='activity-label label-four' htmlFor='activityPlaces'>Límite de plazas</label>
        <input className='input-four' onChange={handleInputChange} value={activityData.activityPlaces} id='activityPlaces' name="activityPlaces" type="number" />

        <select onChange={handleInputChange} value={activityData.activityCoordinator} name="activityCoordinator" id="activityCoordinator">
          <option value="0" disabled>Coordinador</option>
          {employees && employees.map((e) => (
            <option key={e.id} value={e.id}>{e.nickname}</option>
          ))}
        </select>

        <select value="" onChange={handleInputChange} name="activityAssistants" id="activityAssitants">
          <option value="" disabled>Asistentes</option>
          {employees && employees.map((e) => (
            <option key={e.id} value={e.id}>{e.nickname}</option>
          ))}
        </select>

        <input onChange={handleFileChange} type="file" accept="image/*" multiple={false}/>

        <div className='btns'>
          {!activityData.activityId && <input onClick={addActivity} defaultValue='Añadir' className='btn-accept btn' type="button" />}
          {activityData.activityId && <input onClick={editActivity} defaultValue='Editar' className='btn-accept btn' type="button" />}
          <input onClick={closeActivityForm} defaultValue='Cerrar' className='btn-cancel btn' type="button" />
        </div>
      </form>
  );
}

export default FormActivity;