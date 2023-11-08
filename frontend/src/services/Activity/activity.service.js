import http from '../http-common';


const getActivities = () => {
  return http.get('/activities');
};

const getActivity = (id) => {
  return http.get(`/activities/${id}`);
};

const createActivity = (data) => {
  return http.post('/activities', data);
};

const updateActivity = (id, data) => {
  return http.put(`/activities${id}`, data);
};

const deleteActivity = (id) => {
  return http.delete(`/activities/${id}`);
};

const ActivityService = {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity
};


export default ActivityService;