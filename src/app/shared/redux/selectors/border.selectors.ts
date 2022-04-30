import { createFeatureSelector, createSelector } from '@ngrx/store';

const getBorderState = createFeatureSelector<any>('border');

const getBorder = createSelector(getBorderState, (state) => state);

const getBorderValues = createSelector(getBorderState, (state) => state.values);

const getBorderRadius = createSelector(getBorderState, (state) => state.radius);

const getOriginalValues = createSelector(
  getBorderState,
  (state) => state.originalValues
);

export const BorderQuery = {
  getBorder,
  getBorderValues,
  getBorderRadius,
  getOriginalValues,
};
