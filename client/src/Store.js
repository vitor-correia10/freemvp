import { createStore } from "redux";
import allReducers from "./components/reducers";

export default function configureStore(initialState) {
    // const persistedState = loadFromLocalStorage();

    // if (persistedState) {
    //     initialState = {
    //         ...initialState,
    //     }
    // }

    const store = createStore(
        allReducers,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    // store.subscribe(() => saveToLocalStorage(store.getState()))

    return store;
}