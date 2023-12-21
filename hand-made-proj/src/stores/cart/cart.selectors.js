import { createSelector } from 'reselect';

const selectCartFeature = (state) => state.cart;
export const selectProducts = createSelector(selectCartFeature, (state) => state.products);
