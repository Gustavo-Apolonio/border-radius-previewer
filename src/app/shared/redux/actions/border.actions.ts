import { Action } from '@ngrx/store';

export enum BorderActionsType {
  VALUES_SET = '[Border] Set Values',
  RADIUS_SET = '[Border] Set Radius',
  ORIGINAL_SET = '[Border] Set Original',
  CLEAR = '[Border] Clear All',
}

export class BorderSetValues implements Action {
  type = BorderActionsType.VALUES_SET;
  constructor(public payload?: any) {}
}

export class BorderSetOriginalValues implements Action {
  type = BorderActionsType.ORIGINAL_SET;
  constructor(public payload?: any) {}
}

export class BorderSetRadius implements Action {
  type = BorderActionsType.RADIUS_SET;
  constructor(public payload?: any) {}
}

export class BorderClear implements Action {
  type = BorderActionsType.CLEAR;
  constructor(public payload?: any) {}
}

export type BorderActions =
  | BorderSetValues
  | BorderSetOriginalValues
  | BorderSetRadius
  | BorderClear;
