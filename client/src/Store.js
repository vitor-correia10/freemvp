import { createStore } from "redux";
import allReducers from "./components/reducers";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state.LoggedUser)
        const serializedStateProject = JSON.stringify(state.Project)
        const serializedStateRelatedProjects = JSON.stringify(state.RelatedProjects)
        const serializedStateRelatedUsers = JSON.stringify(state.RelatedUsers)
        const serializedStateWorkingProjects = JSON.stringify(state.WorkingProjects)
        const serializedStateWorkingDevelopers = JSON.stringify(state.WorkingDevelopers)
        const serializedStateIsCompleted = JSON.stringify(state.IsCompleted)
        localStorage.setItem('LoggedUser', serializedState)
        localStorage.setItem('Project', serializedStateProject)
        localStorage.setItem('RelatedProjects', serializedStateRelatedProjects)
        localStorage.setItem('RelatedUsers', serializedStateRelatedUsers)
        localStorage.setItem('WorkingProjects', serializedStateWorkingProjects)
        localStorage.setItem('WorkingDevelopers', serializedStateWorkingDevelopers)
        localStorage.setItem('IsCompleted', serializedStateIsCompleted)
    } catch (err) {
        console.log(err)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStateUser = localStorage.getItem('LoggedUser')
        const serializedStateProject = localStorage.getItem('Project')
        const serializedStateRelatedProjects = localStorage.getItem('RelatedProjects')
        const serializedStateRelatedUsers = localStorage.getItem('RelatedUsers')
        const serializedStateWorkingProjects = localStorage.getItem('WorkingProjects')
        const serializedStateWorkingDevelopers = localStorage.getItem('WorkingDevelopers')
        const serializedStateIsCompleted = localStorage.getItem('IsCompleted')

        if (serializedStateUser === null) {
            return undefined
        }
        else {
            if (serializedStateProject === null) {
                return JSON.parse(serializedStateUser)
            } else {
                return [
                    JSON.parse(serializedStateUser),
                    JSON.parse(serializedStateProject),
                    JSON.parse(serializedStateRelatedProjects),
                    JSON.parse(serializedStateRelatedUsers),
                    JSON.parse(serializedStateWorkingProjects),
                    JSON.parse(serializedStateWorkingDevelopers),
                    JSON.parse(serializedStateIsCompleted)
                ]
            }
        }
    } catch (err) {
        console.log(err)
        return undefined
    }
}

export default function configureStore(initialState) {
    const persistedState = loadFromLocalStorage();

    if (persistedState) {
        initialState = {
            ...initialState,
            LoggedUser: persistedState[0],
            Project: persistedState[1],
            RelatedProjects: persistedState[2],
            RelatedUsers: persistedState[3],
            WorkingProjects: persistedState[4],
            WorkingDevelopers: persistedState[5],
            IsCompleted: persistedState[6],
        }
    }

    const store = createStore(
        allReducers,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(() => saveToLocalStorage(store.getState()))

    return store;
}