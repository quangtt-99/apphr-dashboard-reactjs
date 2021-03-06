import { REDUX_STATE } from '../states';

const initialState = {
  attributes: { payload: [], total: 0 },
  attribute: {
    id: 0,
    name: '',
    type: '',
  },
};

const attributeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.attribute.SET_ATTRIBUTES:
      return { ...state, attributes: payload };
    case REDUX_STATE.attribute.SET_ATTRIBUTE:
      return { ...state, attribute: payload };
    case REDUX_STATE.attribute.DELETE_ATTRIBUTE:
      return {
        ...state,
        attributes: state.attributes.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.attribute.EMPTY_VALUE:
      return {
        ...state,
        attribute: initialState.attribute,
      };
    case REDUX_STATE.attribute.EMPTY_LIST:
      return {
        ...state,
        attributes: initialState.attributes,
      };
    default:
      return state;
  }
};

export default attributeReducer;
