import { LOCATION_TO_STATE } from "../actions/types";

const initState = {location: 'Stockholm'};

const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case LOCATION_TO_STATE:
      return {
        location: action.data,
      };
    default:
      return state;
  }
};

export default locationReducer;