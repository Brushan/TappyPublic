import { TAPS_TO_STATE } from "../actions/types";

const initState = {
  taps: 0,
};

const tapsReducer = (state = initState, action) => {
  switch (action.type) {
    case TAPS_TO_STATE:
      return {
        ...state,
        taps: action.data.length,
      };
    default:
      return state;
  }
};

export default tapsReducer;
