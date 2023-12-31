import http from '../http-common';

const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const thirtyMinutes = 1000 * 60 * 1440;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem("token");
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("lastLoginTime");
    return null;
  }
};

const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

const checkAuth = () => {
  return http.get('/current_user', {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${getToken()}`
    }
  }).then(res => {
    return res.data;
  })
};

const loginUser = (credentials) => {
  return http.post('/login', null, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Basic ${credentials}`
    }
  }).then(res => {
    setToken(res.data.token)
    return res.data;
  }).catch(error => {
    throw error
  });
};

const logoutUser = () => {
  return http.delete('/logout', {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${getToken()}`
    }
  });
};

const createAccount = (credentials, body) => {
  return http.post('/signup', body, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Basic ${credentials}`
    }
  });
};

const deleteAccount = () => {
  return http.delete('/signup', {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${getToken()}`
    }
  })
};

const AuthService = {
  checkAuth,
  loginUser,
  logoutUser,
  createAccount,
  deleteAccount
};


export default AuthService;