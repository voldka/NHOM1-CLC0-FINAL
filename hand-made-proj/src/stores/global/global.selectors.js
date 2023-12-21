import { createSelector } from 'reselect';

const selectGlobalFeature = (rootState) => rootState.global;
export const selectIsLoading = createSelector(selectGlobalFeature, (state) => state.isLoading);
export const selectUserInfo = createSelector(selectGlobalFeature, (state) => state.userInfo);
