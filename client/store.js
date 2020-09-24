import { createStore, combineReducers } from "redux";
import quantityReducer from "./reducers/quantityReducer";
import userReducer from "./reducers/userReducer";
import tapReducer from "./reducers/tapReducer";
import locationReducer from './reducers/locationReducer'

const rootReducer = combineReducers({
  quantityReducer: quantityReducer,
  userReducer: userReducer,
  tapReducer: tapReducer,
  locationReducer: locationReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
