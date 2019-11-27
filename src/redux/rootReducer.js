import { combineReducers } from "redux";
import { apiReducer } from "./reducers/api/apiReducer";
import {getHomeDataReducer} from '../redux/reducers/api/getHomeDataReducer'

export default combineReducers({
    apiReducer: apiReducer,
    getHomeDataReducer : getHomeDataReducer,
});