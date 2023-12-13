import ActivityService from "../../services/Activity/activity.service";

function Activity() {
  const  inscription = () => {
    // ActivityService.addClient(idActivity, idUser).then(r => console.log(r))
  }
 return (
  <div className="content-container">
    <div className="images-container">
      <div className="image-activity"></div>
      <div className="image-coordinator"></div>
    </div>
    <div className="data-activity"></div>
    <div>
      <button onClick={inscription}>Inscribirse</button>
    </div>
  </div>
 ); 
}

export default Activity;