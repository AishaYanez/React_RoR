import './FormActivity.css';

function FormActivity(props) {
  
  const closeActivityForm = () => {
    props.setStatusForm('hidden');
  }
  
  return (
      <form className={`activity-form ${props.statusForm}`} action="">
        <h3>Actividad</h3>
        <input name="activityName" type="text" />
        <input name="activityDescription" type="text" />
        <input name="activityDate" type="datetime-local" />
        <input name="activityNumPlace" type="number" />
        <input name="activityLocation" type="text" />
        <input name="activityCoordinator" type="text" />
        <input name="activityAssistants" type="text" />
        <input name="activityImage" type="file" />

        <div className='btns'>
          <input defaultValue='Añadir' className='btn-accept btn' type="button" />
          <input onClick={closeActivityForm} defaultValue='Cerrar' className='btn-cancel btn' type="button" />
        </div>
      </form>
  );
}

export default FormActivity;