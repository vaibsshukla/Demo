import { takeEvery, call, put } from "redux-saga/effects";
import { API_CALL, API_CALL_FAILURE } from '../../actions'
import NetworkManager from '../../../utility/NetworkManager'
import {log} from '../../../utility/Utility'


export const apiWatcherSaga = [
    takeEvery(API_CALL, apiWorkerSaga),
];

function* apiWorkerSaga(action) {
    try {
        const response = yield call(apiCall, action.data.api, action.data.requestType, action.data.reqObject);
        log('res: ', JSON.stringify(response))
        const data = response;
        yield put({ type: action.data.type, data });
    } catch (error) {
        log('error', JSON.stringify(error))
        yield put({ type: API_CALL_FAILURE, error });
    }
}

function apiCall(api, request, data) {
    return NetworkManager.networkManagerInstance.fetchRequest(api, request, data);
}