import { useEffect, useState } from 'react';
import UserService from '../../services/User/user.service';
import ActivityService from "../../services/Activity/activity.service";
import './FormActivity.css';

function FormActivity(props) {
  const [employees, setEmployees] = useState([]);

  const closeActivityForm = () => {
    props.setStatusForm('hidden');
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

  const addActivity = () => {
    console.log(props.activityData);
    const newActivity = props.activityData;
    ActivityService.createActivity(newActivity).then( res => console.log('ok')).catch(error => console.error('No ok'));
  };
  
  return (
      <form className={`activity-form ${props.statusForm}`} action="">
        <h3>Actividad</h3>
        <input value={props.activityData.name} name="activityName" type="text" />
        <input value={props.activityData.description} name="activityDescription" type="text" />
        <input value={props.activityData.date} name="activityDate" type="date" />
        <input value={props.activityData.places} name="activityNumPlace" type="number" />
        {/* <input value={} name="activityLocation" type="text" /> */}
        <select value={props.activityData.user_id} name="activityCoordinator" id="activityCoordinator">
          {employees && employees.map((e) => (
            <option key={e.id} value={e.id}>{e.nickname}</option>
          ))}
        </select>
        {/* <input name="activityAssistants" type="text" /> */}
        {/* <input name="activityImage" type="file" /> */}

        <div className='btns'>
          <input onClick={addActivity} defaultValue='Añadir' className='btn-accept btn' type="button" />
          <input onClick={closeActivityForm} defaultValue='Cerrar' className='btn-cancel btn' type="button" />
        </div>
      </form>
  );
}

export default FormActivity;