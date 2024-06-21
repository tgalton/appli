import { createReducer, on } from '@ngrx/store';
import { Hearth } from './../../models/hearth';
import * as HearthActions from './../actions/hearths.actions';

export interface HearthsState {
  hearths: Hearth[];
  loaded: boolean;
}

export const initialState: HearthsState = {
  hearths: [],
  loaded: false,
};

export const hearthsReducer = createReducer(
  initialState,
  on(HearthActions.loadHearthsSuccess, (state, { hearths }) => ({
    ...state,
    hearths,
    loaded: true,
  })),
  on(HearthActions.addHearth, (state, { hearth }) => ({
    ...state,
    hearths: [...state.hearths, hearth],
  })),
  on(HearthActions.updateHearth, (state, { hearth }) => ({
    ...state,
    hearths: state.hearths.map((h) => (h.id === hearth.id ? hearth : h)),
  })),
  on(HearthActions.deleteHearth, (state, { hearthId }) => ({
    ...state,
    hearths: state.hearths.filter((h) => h.id !== hearthId),
  })),
  on(HearthActions.updateHearthDetails, (state, { hearthId, updates }) => ({
    ...state,
    hearths: state.hearths.map((hearth) =>
      hearth.id === hearthId ? { ...hearth, ...updates } : hearth
    ),
  }))
);
