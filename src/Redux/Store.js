import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import Reducer from "./Reducer";


const RootReducer=combineReducers({Reducer})

const store=createStore(RootReducer,applyMiddleware(thunk))

window.store=store

export default store