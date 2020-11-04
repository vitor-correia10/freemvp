import { combineReducers } from "redux";

import User from "./User-Reducer";
import Project from "./Project-Reducer";
import modalTogglerReducer from "./ToggleModal";
import LoggedUser from "./LoggedUser";
import RelatedProjects from "./RelatedProjects-Reducer";
import RelatedUsers from "./RelatedUsers-Reducer";

const allReducers = combineReducers({
    User,
    LoggedUser,
    Project,
    RelatedProjects,
    RelatedUsers,
    modal: modalTogglerReducer,
});

export default allReducers;