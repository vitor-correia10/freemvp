import { combineReducers } from "redux";

import User from "./User-Reducer";
import Project from "./Project-Reducer";
import LoginTogglerReducer from "./ToggleLogin";
import modalTogglerReducer from "./ToggleModal";
import LoggedUser from "./LoggedUser";

const allReducers = combineReducers({
    User,
    LoggedUser,
    Project,
    login: LoginTogglerReducer,
    modal: modalTogglerReducer,
});

export default allReducers;