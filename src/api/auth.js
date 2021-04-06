import axios from './axios';

const register = credentials => axios.post('/users', { user: credentials });
const login = credentials => axios.post('/users/login', { user: credentials });
const getCurrentUser = () => axios.get('/user');
const updateCurrentUser = currentUserInput => axios.put('/user', { user: currentUserInput })
  .then(response => response.data.user);

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
};
