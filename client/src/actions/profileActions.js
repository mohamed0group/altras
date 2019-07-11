import axios from 'axios';

import { GET_ERRORS, GET_PROFILE } from './types';
// GET user profile
export const getProfile = () => dispatch => {
  axios
    .get('/api/profile/')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET user profile
export const getProfileByHandle = (handle) => dispatch => {
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// POST profile
export const postProfile = (profileData) => dispatch => {
  axios
    .post('/api/profile/', profileData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};