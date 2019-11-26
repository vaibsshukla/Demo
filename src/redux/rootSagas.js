import { all } from 'redux-saga/effects';
import { apiWatcherSaga } from './reducers/api/apiSaga'
export default function* rootSaga() {
    yield all([
        ...apiWatcherSaga
    ]);
}