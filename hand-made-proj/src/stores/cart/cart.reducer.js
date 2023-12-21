import * as actions from './cart.actions';

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_CART_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
