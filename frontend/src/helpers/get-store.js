import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { authMiddleware } from "../middlewares/auth.middleware";
import { callAPIMiddleware } from "../middlewares/call-api.middleware";

import session from "../auth/auth.redux";

const rootReducer = {
  session
};

export const getStore = (initialState, history) => {
  const middlewares = [thunkMiddleware, authMiddleware, callAPIMiddleware];

  let composeEnhancers = compose;

  middlewares.push(
    createLogger({
      collapsed: true
    })
  );

  if (history) {
    middlewares.push(routerMiddleware(history));
  }

  const store = createStore(
    combineReducers({
      ...rootReducer,
      router: routerReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
};
