import { combineReducers } from "redux";

import User from "./User-Reducer";
import Project from "./Project-Reducer";
import LoginTogglerReducer from "./ToggleLogin";
import modalTogglerReducer from "./ToggleModal";

const allReducers = combineReducers({
    User,
    Project,
    login: LoginTogglerReducer,
    modal: modalTogglerReducer,
});

export default allReducers;