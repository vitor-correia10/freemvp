import { combineReducers } from "redux";

import User from "./User-Reducer";
import Project from "./Project-Reducer";
import modalTogglerReducer from "./ToggleModal";
import LoggedUser from "./LoggedUser";

const allReducers = combineReducers({
    User,
    LoggedUser,
    Project,
    modal: modalTogglerReducer,
});

export default allReducers;