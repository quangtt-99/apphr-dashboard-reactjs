import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleWageExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server Bad Gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Internal server error';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = "You don't have permission to do this function";
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        localStorage.clear();
        dispatch({
          type: REDUX_STATE.user.SET_USER,
          payload: {
            username: '',
            token: '',
          },
        });
        break;
      case RESPONSE_CODE.CE_BAD_REQUEST:
        errorMessage = err.response.data.message.en;
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchWages = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wage
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((wage) => {
                wage.createdAt = formatDateTimeToString(wage.createdAt);
                return wage;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.wage.SET_WAGES, payload: payload });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'fetchWages');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchWage = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wage
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'fetchWage');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createWage = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.wage
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.WAGE + `/${payload.id}`);
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'createWage');
      });
  };
};

export const updateWage = (data, success_msg) => {
  return (dispatch, getState) => {
    api.wage
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'updateWage');
      });
  };
};

export const deleteWage = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.wage
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'deleteWage');
      });
  };
};

export const setEmptyWage = () => {
  return {
    type: REDUX_STATE.wage.EMPTY_VALUE,
    payload: [],
  };
};

export const setEmptyWages = () => {
  return {
    type: REDUX_STATE.wage.EMPTY_LIST,
    payload: [],
  };
};
