import * as actions from './global.actions';
// Reducer
const initialState = {
  userInfo: null,
  listProductOrders: [],
  isLoading: false,
};

const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SHOW_LOADING: {
      return { ...state, isLoading: true };
    }
    case actions.HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    case actions.SET_USER: {
      return { ...state, userInfo: payload };
    }
    case actions.RESET_USER: {
      return { ...state, userInfo: null };
    }

    default: {
      return state;
    }
  }
};
export default globalReducer;
