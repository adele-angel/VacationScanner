import axios from "axios";
import openSocket from "socket.io-client";

import {
  ADD_VACATION,
  GET_ERRORS,
  GET_VACATIONS,
  GET_VACATION,
  DELETE_VACATION,
  VACATION_LOADING
} from "./types";

const socket = openSocket("http://localhost:5000");

// Add vacation
export const addVacation = vacationData => dispatch => {
  axios
    .post("/vacation", vacationData)
    .then(res =>
      socket.on("vacations", data => {
        // if (data.action === 'create') {
        dispatch({
          type: ADD_VACATION,
          payload: data
        });
        // }
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get vacations
export const getVacations = () => dispatch => {
  dispatch(setVacationLoading());
  axios
    .get("/vacation/all")
    .then(res =>
      dispatch({
        type: GET_VACATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VACATIONS,
        payload: null
      })
    );
};

// Get vacation
export const getVacation = id => dispatch => {
  dispatch(setVacationLoading());
  axios
    .get(`/vacation/${id}`)
    .then(res =>
      dispatch({
        type: GET_VACATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VACATION,
        payload: null
      })
    );
};

// Delete vacation
export const deleteVacation = id => dispatch => {
  axios
    .delete(`/vacation/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_VACATION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Follow/Unfollow vacation
export const addLike = id => dispatch => {
  axios
    .post(`/vacation/like/${id}`)
    .then(res => dispatch(getVacations()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Unfollow vacation
export const removeLike = id => dispatch => {
  axios
    .post(`/vacation/unlike/${id}`)
    .then(res => dispatch(getVacations()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit vacation
export const editVacation = (vacationId, vacationData) => dispatch => {
  axios
    .post(`/vacation/${vacationId}`, vacationData)
    .then(res =>
      dispatch({
        type: GET_VACATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setVacationLoading = () => {
  return { type: VACATION_LOADING };
};
