import { createStore, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";
import modules from "./modules/reducers/";

export const reducers = combineReducers({
	...modules
});

export default createStore(reducers, applyMiddleware(thunk));
