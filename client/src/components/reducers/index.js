import { combineReducers } from "redux";

import Developer from "./Developer-Reducer";

const allReducers = combineReducers({
    Developer,
});

export default allReducers;