//import { PARTNERS } from "../shared/partners";
import * as ActionTypes from "./ActionTypes";

export const Partners = (
  state = {
    isLoading: true,
    errMess: null,
    partners: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PARTNERS:
      return { ...state, isLoading:false, errMess: null, partners: action.payload };

    case ActionTypes.PARTNERS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.PARTNERS_LOADING:
      return { ...state, isLoading: true, errMess: null, partners: [] };

    default:
      return state;
  }
};


