import { SET_USER, SET_USER_INFO } from "app/actions/actionTypes";
import { isEmpty } from "lodash";

const initialState = {
  email: "",
  isAuthenticated: false,
  info: {},
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.email,
        isAuthenticated: !isEmpty(action.user),
        info: action.info,
        user: action.user,
      };
    case SET_USER_INFO:
      return {
        ...state,
        info: action.info,
      };
    default:
      return state;
  }
}
