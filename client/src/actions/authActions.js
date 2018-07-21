import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => async dispatch => {
 
  try {
    const newUser = await axios.post("http://localhost:5000/api/users/register", userData);
    if (newUser) history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }

};

export const loginUser = (userData) => async dispatch => {

  try {
    const user = await axios.post("http://localhost:5000/api/users/login", userData);
    // Get the token
    const { token } = user.data;
    // Save the token in localStorage
    localStorage.setItem('jwtToken', token);
    // Set token to Authentication header
    setAuthToken(token);
    // Get the user by the token
    const userDecoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(userDecoded));
    return true;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }

};

export const setCurrentUser = (userDecoded) => ({
  type: SET_CURRENT_USER,
  payload: userDecoded
});

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header
  setAuthToken(false);
  // Set user to {}
  dispatch(setCurrentUser({}));
};