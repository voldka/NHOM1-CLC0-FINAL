import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Global
import * as globalActions from './global/global.actions';
import globalReducer from './global/global.reducer';
import * as globalSelectors from './global/global.selectors';
// Cart
import * as cartActions from './cart/cart.actions';
import cartReducer from './cart/cart.reducer';
import * as cartSelectors from './cart/cart.selectors';

const rootReducer = combineReducers({
  global: globalReducer,
  cart: cartReducer,
});
const middlewares = [thunk];
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
export const persistor = persistStore(store);
export const actions = {
  ...globalActions,
  ...cartActions,
};
export const selectors = {
  ...globalSelectors,
  ...cartSelectors,
};
