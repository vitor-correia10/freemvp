import { createStore } from "redux";
import allReducers from "./components/reducers";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state.LoggedUser)
        const serializedStateProject = JSON.stringify(state.Project)
        localStorage.setItem('LoggedUser', serializedState)
        localStorage.setItem('LoggedProject', serializedStateProject)
    } catch (err) {
        console.log(err)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('LoggedUser')
        const serializedStateProject = localStorage.getItem('LoggedProject')

        if (serializedState === null) {
            return undefined
        }
        else {
            if (serializedStateProject === null) {
                return JSON.parse(serializedState)
            } else {
                return JSON.parse({ serializedState, serializedStateProject })
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
            LoggedUser: persistedState,
            Project: persistedState,
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