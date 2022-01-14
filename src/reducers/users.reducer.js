import initialState from './initialState';
import { actionTypes } from '../constants/actionTypes';

export default (state = initialState.users, action) => {
  switch (action.type) {
    case actionTypes.getUsers: {
      return (state = action.payload.users);
    }
    case actionTypes.createUser: {
      return (state = state.concat(action.payload));
    }
    case actionTypes.deleteUser: {
      return (state = action.payload.users);
    }
    case actionTypes.updateUser: {
      return (state = state.map((e) => (e.id === action.payload.id ? action.payload : e)));
    }
    default:
      return state;
  }
};
