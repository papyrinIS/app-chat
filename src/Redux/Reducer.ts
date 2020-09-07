import {InferActionsTypes} from "./Store";
import {Actions} from "./Actions";
import {MessageT, UserT} from "../Types";

export const AUTH = 'AUTH'
export const GET_MESSAGES = 'GET_MESSAGES'
export const GET_USERS = 'GET_USERS'
export const CHANGE_CHAT = 'CHANGE_CHAT'
export const NEW_MESSAGE = 'NEW_MESSAGE'
export const ERROR = 'ERROR'

export const initialState = {
    isAuth: false,
    userName: '' as string,
    chatName: 'start',
    users: [] as Array<UserT> ,
    messages: [] as Array<MessageT>,
    isError:false
}


const Reducer = (state = initialState, action:ActionsTypes):initialStateT => {
    switch (action.type) {
        case AUTH:
            return {
                ...state,
                userName: action.userName,
                isAuth: true
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            }
        case GET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case CHANGE_CHAT:
            return {
                ...state,
                chatName: action.chatName
            }
        case NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    userName: action.newMessages.userName,
                    message: action.newMessages.message,
                    id: action.newMessages.id
                }
                ]
            }
        case ERROR:
            return{
                ...state,
                isError: action.isError
            }
        default:
            return state
    }
}

export default Reducer

export type ActionsTypes=InferActionsTypes<typeof Actions>
type initialStateT=typeof initialState

