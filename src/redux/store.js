import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import searchFormReducer from "./searchForm-reducer";
import appReducer from "./app-reducer";
import infoReducer from "./info-reducer";

let reducers = combineReducers({
    searchForm: searchFormReducer,
    app: appReducer,
    info: infoReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;