import http from '../http-common';


const getEmployees = () => {
  return http.get('/employees');
};

const updateUser = (id, credentials) => {
  return http.put(`/users/${id}/update_password`, null, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Basic ${credentials}`
    }
  });
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


const UserService = {
  getEmployees,
  updateUser
};


export default UserService;