export const AUTH = 'AUTH'
export const GET_MESSAGES = 'GET_MESSAGES'
export const GET_USERS = 'GET_USERS'
export const CHANGE_CHAT = 'CHANGE_CHAT'
export const NEW_MESSAGE = 'NEW_MESSAGE'

export const initialState = {
    isAuth: false,
    userName: null,
    chatName: 'start',
    users: [],
    messages: []
}


const Reducer = (state = initialState, action) => {
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
        default:
            return state
    }
}

export default Reducer