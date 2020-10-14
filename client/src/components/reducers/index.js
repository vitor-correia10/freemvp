import { combineReducers } from "redux";

import Developer from "./Developer-Reducer";
import LoginTogglerReducer from "./ToggleLogin";

const allReducers = combineReducers({
    Developer,
    login: LoginTogglerReducer,
});

export default allReducers;