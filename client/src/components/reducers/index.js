import { combineReducers } from "redux";

import User from "./User-Reducer";
import Project from "./Project-Reducer";
import modalTogglerReducer from "./ToggleModal";
import LoggedUser from "./LoggedUser";
import RelatedProjects from "./RelatedProjects-Reducer";
import RelatedUsers from "./RelatedUsers-Reducer";
import WorkingProjects from "./WorkingProjects-Reducer";
import WorkingDevelopers from "./WorkingDevelopersByProject-Reducer";

const allReducers = combineReducers({
    User,
    LoggedUser,
    Project,
    RelatedProjects,
    RelatedUsers,
    WorkingProjects,
    WorkingDevelopers,
    modal: modalTogglerReducer,
});

export default allReducers;