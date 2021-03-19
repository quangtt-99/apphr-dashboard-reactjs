import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const formatDownloadedData = (payload) => {
  return payload?.map((tup) => {
    tup.createdAt.replace('Z', '');
    return tup;
  });
};

export const fetchRoles = () => {
  return (dispatch, getState) => {
    api.role
      .getAll()
      .then(({ payload }) => {
        payload = formatDownloadedData(payload);
        dispatch({ type: REDUX_STATE.role.SET_ROLES, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchRole = (id) => {
  return (dispatch, getState) => {
    api.role
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_ROLE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createRole = (params, history) => {
  return (dispatch, getState) => {
    api.role
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_ROLE, payload });
        history.push(`/setting/role/${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateRole = (data) => {
  return (dispatch, getState) => {
    api.role
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_ROLE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteRole = (id) => {
  return (dispatch, getState) => {
    api.role
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.DELETE_ROLE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setEmptyRole = () => {
  return {
    type: REDUX_STATE.role.EMPTY_VALUE,
    payload: [],
  };
};

export const fetchPermissions = () => {
  return (dispatch, getState) => {
    api.role
      .getAllPermission()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_PERMISSIONS, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};