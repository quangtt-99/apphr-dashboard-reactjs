import { formatTime } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const dayIndex = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

export const fetchAssignments = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.assignment
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.startDate = a.date.replace('00:00:00.000Z', a.shift.startCC);
                a.endDate = a.date.replace('00:00:00.000Z', a.shift.endCC);
                a.title = a.shift.code + ' - ' + a.shift.name;
                a.location = a.shift.branch.code + ' - ' + a.shift.branch.name;
                return a;
              })
            : [];
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchRollUpTable = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.assignment
      .getAll(params)
      .then(({ payload, total }) => {
        let data = [];
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                let x = {
                  id: a.id,
                  fullname: a.fullname,
                  code: a.code,
                  sunday: [],
                  monday: [],
                  tuesday: [],
                  wednesday: [],
                  thursday: [],
                  friday: [],
                  saturday: [],
                };
                a.assignments.forEach((element) => {
                  let dayTh = new Date(element.date).getDay();

                  x[dayIndex[dayTh]].push({
                    id: element.id,
                    shiftCode: element.shift.code,
                    point: element.point,
                    startCC: formatTime(element.shift.startCC),
                    endCC: formatTime(element.shift.endCC),
                  });
                });
                data.push(x);
                return a;
              })
            : [];
        console.log(data);
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENTS, payload: data });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchAssignment = (id) => {
  return (dispatch, getState) => {
    api.assignment
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENT, payload });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const createAssignment = (params, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .post(params)
      .then(({ payload }) => {
        payload.startDate = payload.date.replace('00:00:00.000Z', payload.shift.startCC);
        payload.endDate = payload.date.replace('00:00:00.000Z', payload.shift.endCC);
        payload.title = payload.shift.code + ' - ' + payload.shift.name;
        payload.location = payload.shift.branch.code + ' - ' + payload.shift.branch.name;
        dispatch({ type: REDUX_STATE.assignment.SET_ASSIGNMENT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const deleteAssignment = (id, success_msg) => {
  return (dispatch, getState) => {
    api.assignment
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.assignment.DELETE_ASSIGNMENT, payload });
        // handleAfterDeleted();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const setEmptyAssignments = () => {
  return {
    type: REDUX_STATE.assignment.EMPTY_VALUE,
    payload: [],
  };
};
