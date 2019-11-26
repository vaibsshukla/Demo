import { combineReducers } from "redux";
import { apiReducer } from "./reducers/api/apiReducer";


export default combineReducers({
    apiReducer: apiReducer,
});