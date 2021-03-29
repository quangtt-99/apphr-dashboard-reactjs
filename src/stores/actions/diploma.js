import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const createDiploma = (data, success_msg) => {
  return (dispatch, getState) => {
    api.diploma
      .post(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.diploma.SET_DIPLOMA, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: error } });
      });
  };
};

export const updateDiploma = (data, success_msg) => {
  return (dispatch, getState) => {
    api.diploma
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.diploma.SET_DIPLOMA, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: error } });
      });
  };
};

export const fetchDiplomaByType = (params) => {
  return (dispatch, getState) => {
    api.diploma
      .getAll(params)
      .then(({ payload }) => {
        if (params.type === 'degree') {
          dispatch({ type: REDUX_STATE.diploma.SET_DEGREES, payload });
        } else {
          dispatch({ type: REDUX_STATE.diploma.SET_CERTIFICATES, payload });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteDiploma = (id) => {
  return (dispatch, getState) => {
    api.diploma
      .delete(id)
      .then(({ payload }) => {
        if (payload.type === 'certificate') {
          dispatch({ type: REDUX_STATE.diploma.DELETE_CERTIFICATE, payload });
        } else {
          dispatch({ type: REDUX_STATE.diploma.DELETE_DEGREE, payload });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};