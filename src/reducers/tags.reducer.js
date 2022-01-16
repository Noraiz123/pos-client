import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.tags, action) => {
  switch (action.type) {
    case actionTypes.getTags: {
      return (state = action.payload.tags);
    }
    case actionTypes.createTag: {
      return (state = state.concat(action.payload));
    }
    default:
      return state;
  }
};
