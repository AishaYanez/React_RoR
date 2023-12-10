import http from '../http-common';


const getEmployees = () => {
  return http.get('/employees');
};

// const getUsers = () => {
//   return http.get('/users');
// };

// const getUser = (clave) => {
//   return http.get(`/users/user?clave=${clave}`);
// };

// const createUser = (data) => {
//   return http.post('/users', data);
// };


// const deleteUser = (email) => {
//   return http.delete(`/users/user?email=${email}`);
// };

const updateUser = (email, data) => {
  return http.put(`/users/user?email=${email}`, data);
};

const UserService = {
  getEmployees,
  updateUser
};


export default UserService;