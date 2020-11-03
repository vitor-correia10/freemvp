import { createStore } from "redux";
import allReducers from "./components/reducers";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state.LoggedUser)
        const serializedStateProject = JSON.stringify(state.Project)
        const serializedStateRelatedProjects = JSON.stringify(state.RelatedProjects)
        localStorage.setItem('LoggedUser', serializedState)
        localStorage.setItem('Project', serializedStateProject)
        localStorage.setItem('RelatedProjects', serializedStateRelatedProjects)
    } catch (err) {
        console.log(err)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStateUser = localStorage.getItem('LoggedUser')
        const serializedStateProject = localStorage.getItem('Project')
        const serializedStateRelatedProjects = localStorage.getItem('RelatedProjects')

        if (serializedStateUser === null) {
            return undefined
        }
        else {
            if (serializedStateProject === null) {
                return JSON.parse(serializedStateUser)
            } else {
                return [JSON.parse(serializedStateUser),
                JSON.parse(serializedStateProject),
                JSON.parse(serializedStateRelatedProjects)]
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