import { combineReducers } from "redux";

import Developer from "./Developer-Reducer";
import LoginTogglerReducer from "./ToggleLogin";
import modalTogglerReducer from "./ToggleModal";

const allReducers = combineReducers({
    Developer,
    login: LoginTogglerReducer,
    modal: modalTogglerReducer,
});

export default allReducers;