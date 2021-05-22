import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
const handleWageExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server Bad Gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Đã xảy ra lỗi ở server';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = 'Bạn không thể thực hiện chức năng này';
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        errorMessage = 'Token bị quá hạn';
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchWageHistories = (params, onTotalChange, setLoading) => {
  const paymentType = {
    by_hour: 'Chi trả theo giờ',
    by_month: 'Chi trả theo tháng',
  };
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wageHistory
      .getAll(params)
      .then(({ payload, total }) => {
        // payload =
        //   payload && payload.length > 0
        //     ? payload.map((wage) => {
        //         wage.type = paymentType[wage.type];
        //         return wage;
        //       })
        //     : [];
        dispatch({ type: REDUX_STATE.wageHistory.SET_WAGE_HISTORIES, payload: payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'fetchWageHistories');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchWageHistory = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wageHistory
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wageHistory.SET_WAGE_HISTORY, payload });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'fetchWageHistory');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createWageHistory = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.wageHistory
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wageHistory.SET_WAGE_HISTORY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.NAV_BENEFIT_CREATE + `/${payload.id}`);
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'createWageHistory');
      });
  };
};

export const updateWageHistory = (data, success_msg) => {
  return (dispatch, getState) => {
    api.wageHistory
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wageHistory.SET_WAGE_HISTORY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'updateWageHistory');
      });
  };
};

export const deleteWageHistory = (id, success_msg) => {
  return (dispatch, getState) => {
    api.wageHistory
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wageHistory.DELETE_WAGE_HISTORY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'deleteWageHistory');
      });
  };
};

export const setEmptyWageHistories = () => {
  return {
    type: REDUX_STATE.wageHistory.EMPTY_LIST,
    payload: [],
  };
};

export const setEmptyWageHistory = () => {
  return {
    type: REDUX_STATE.wageHistory.EMPTY_VALUE,
    payload: [],
  };
};