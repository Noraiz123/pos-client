import { actionTypes } from '../constants/actionTypes';
import initialState from './initialState';

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case actionTypes.login: {
      const { email, id } = action.payload;
      return { ...state, isSignedIn: true, email, userId: id };
    }
    default:
      return state;
  }
};
