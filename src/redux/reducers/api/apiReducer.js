import {
    API_CALL_FAILURE, TEST_API_CALL_SUCCESS
} from '../../actions';
import {log} from '../../../utility/Utility'
const initialState = {
    testResponse: ''
}

export function apiReducer(state = initialState, action) {
    switch (action.type) {
        case API_CALL_FAILURE:
            log("action", action);
            return {
                ...state
            }
        case TEST_API_CALL_SUCCESS:
            log("action Api Failure", action);
            return {
                ...state,
                testResponse: action.data
            }
        default:
            return state;
    }
}