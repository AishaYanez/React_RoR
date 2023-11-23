import http from '../http-common';


const getUsers = () => {
  return http.get('/users');
};

const getUser = (clave) => {
  return http.get(`/users/user?clave=${clave}`);
};

const createUser = (data) => {
  return http.post('/users', data);
};


const deleteUser = (email) => {
  return http.delete(`/users/user?email=${email}`);
};

const updateUser = (email, data) => {
  return http.put(`/users/user?email=${email}`, data);
};

const UserService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};


export default UserService;