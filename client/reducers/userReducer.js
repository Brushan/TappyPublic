import { USER_TO_STATE } from "../actions/types";

const initState = {
  user: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_TO_STATE:
      return {
        ...state,
        user: state.user.concat({
          email: action.data.email,
          fullName: action.data.fullName,
          userId: action.data.id,
        }),
      };
    default:
      return state;
  }
};

export default userReducer;
