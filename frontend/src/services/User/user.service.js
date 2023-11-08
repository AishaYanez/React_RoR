import http from '../http-common';


const getUsers = () => {
  return http.get('/users');
};

const getUser = (email, password) => {
  return http.get(`/users/user?email=${email}&password=${password}`);
};

const createUser = (data) => {
  return http.post('/users', data);
};

const updateUser = (email, data) => {
  return http.put(`/users/user?email=${email}`, data);
};

const deleteUser = (email) => {
  return http.delete(`/users/user?email=${email}`);
};

const UserService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};


export default UserService;