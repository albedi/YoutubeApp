import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

import mdInicio from "../modules/inicio/reducers";

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  counter: 0,
};

function mainState(state = initialState, action) {
  return state;
}

const allReducers = combineReducers({ mainState, mdInicio });

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  //console.debug("Current:", store.getState());
  console.debug("ACTION", action);
  //console.time(action.type);
  next(action);
  //console.timeEnd(action.type);
  //console.debug("Final", store.getState());
  console.groupEnd();
};

const mainStore = createStore(allReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default mainStore;
