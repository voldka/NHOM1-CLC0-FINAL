import CartService from '../../shared/services/cart.service';
import { hideLoading, showLoading } from '../global/global.actions';

export const SET_CART_PRODUCTS = 'cart/set_cart_products';
export const setCartProducts = (products) => ({ type: SET_CART_PRODUCTS, payload: products });

export const GET_CART_BY_USER_ID = 'cart/get_cart_by_user_id';
export const getCartByUserId = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const updatedCart = await CartService.getCartByUserId(userId);
      dispatch(setCartProducts(updatedCart.products));
      return true;
    } catch (error) {
      return Promise.reject(error?.response?.data?.message || error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const ADD_PRODUCT_TO_CART = 'cart/add_product_to_cart';
export const addProductToCart = (userId, products) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const updatedCart = await CartService.update(userId, { products });
      dispatch(setCartProducts(updatedCart.products));
      return true;
    } catch (error) {
      return Promise.reject(error?.response?.data?.message || error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};
