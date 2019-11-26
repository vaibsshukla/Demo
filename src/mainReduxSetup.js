import React, { Component } from 'react';

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga"; ``
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./redux/rootReducer";
import rootSaga from "./redux/rootSagas";

import Iseas from './screens/Iseas';

const middleware = []
const enhancers = []
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)
enhancers.push(applyMiddleware(...middleware))

const createAppropriateStore = createStore
const store = createAppropriateStore(reducer, composeWithDevTools(...enhancers))
sagaMiddleware.run(rootSaga);

class mainReduxSetup extends Component {
    render() {
        return (
            <Provider store={store}>
                <Iseas />
            </Provider>
        )
    }
}
export default mainReduxSetup