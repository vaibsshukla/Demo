import {
    API_CALL_FAILURE, TEST_API_CALL_SUCCESS
} from '../../actions';

const initialState = {
    testResponse: ''
}

export function apiReducer(state = initialState, action) {
    switch (action.type) {
        case API_CALL_FAILURE:
            console.log("action", action);
            return {
                ...state
            }
        case TEST_API_CALL_SUCCESS:
            console.log("action", action);
            return {
                ...state,
                testResponse: action.data
            }
        default:
            return state;
    }
}