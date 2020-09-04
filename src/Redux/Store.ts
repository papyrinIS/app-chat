import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import Reducer from "./Reducer";


const RootReducer=combineReducers({Reducer})

const store=createStore(RootReducer,applyMiddleware(thunk))

// @ts-ignore
window.store=store

export default store

export type AppStateT = ReturnType<typeof RootReducer>


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateT, unknown, A>
export type SocketType<A extends Action, R = void> = ThunkAction<R, AppStateT, unknown, A>