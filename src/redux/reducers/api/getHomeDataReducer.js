import {
    HOME_API_CALL_SUCCESS, SHOW_PROGRESS_FROM_HOME, API_CALL_FAILURE
} from '../../actions';
import {log} from '../../../utility/Utility'

const initialState = {
    featuredData: '',
    mainData: [],
    showProgress: false
}

export function getHomeDataReducer(state = initialState, action) {
    switch (action.type) {
        case HOME_API_CALL_SUCCESS:
            log("action  getHomeDataReducer", action);

            let mainData = [];


            if (action.data.data.new_arrival && action.data.data.new_arrival.length > 0) {
                let mainObj = {};
                mainObj.list_name = 'New Arrival';
                mainObj.data = action.data.data.new_arrival;
                mainData.push(mainObj);
            }
            if (action.data.data.most_popular && action.data.data.most_popular.length > 0) {
                let mainObj = {};
                mainObj.list_name = 'Most Popular';
                mainObj.data = action.data.data.most_popular;
                mainData.push(mainObj);
            }
            // log('mainData', JSON.stringify(mainData));
            return {
                ...state,
                showProgress: false,
                featuredData: action.data.data,
                mainData: mainData
            }
        case SHOW_PROGRESS_FROM_HOME:
            return {
                ...state,
                showProgress: true,
            }
        // case API_CALL_FAILURE:
        //     return {
        //         ...state,
        //         showProgress: false,
        //     }
        default:
            return state;
    }
}