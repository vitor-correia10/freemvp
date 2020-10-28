import { createStore } from "redux";
import allReducers from "./components/reducers";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state.LoggedUser)
        const serializedStateProject = JSON.stringify(state.Project)
        localStorage.setItem('LoggedUser', serializedState)
        localStorage.setItem('Project', serializedStateProject)
    } catch (err) {
        console.log(err)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStateUser = localStorage.getItem('LoggedUser')
        const serializedStateProject = localStorage.getItem('Project')

        if (serializedStateUser === null) {
            return undefined
        }
        else {
            if (serializedStateProject === null) {
                return JSON.parse(serializedStateUser)
            } else {
                console.log('User', serializedStateUser)
                console.log('Project', serializedStateProject)
                return [JSON.parse(serializedStateUser), JSON.parse(serializedStateProject)]
            }
        }
    } catch (err) {
        console.log(err)
        return undefined
    }
}

export default function configureStore(initialState) {
    console.log(loadFromLocalStorage());
    const [loggedUser, project] = loadFromLocalStorage();

    if (loggedUser, project) {
        initialState = {
            ...initialState,
            loggedUser,
            project,
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