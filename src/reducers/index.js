import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import getHaberler from './getHaberler'

export default combineReducers({
  auth,
  message,
  getHaberler
});