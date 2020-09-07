import {ActionsTypes, AUTH, CHANGE_CHAT, ERROR, GET_MESSAGES, GET_USERS, NEW_MESSAGE} from "./Reducer";
import {chatAPI} from "../Api/Api";
import {socket} from "../socket";
import {BaseThunkType, SocketType} from "./Store";
import {deleteMessageObjT, editMessageObjT, MessageT, PayloadT, UserT} from "../Types";

export const Actions= {
    authAC: (userName:string) => ({type: AUTH, userName}as const),
    getMessagesAC:(messages:Array<MessageT>)=>({type:GET_MESSAGES,messages}as const),
    getUsersAC:(users:Array<UserT>)=>({type:GET_USERS,users}as const),
    changeChatAC:(chatName:string)=>({type:CHANGE_CHAT,chatName}as const),
    newMessagesAC:(newMessages:MessageT)=>({type:NEW_MESSAGE,newMessages}as const),
    errorAC:(isError:boolean)=>({type:ERROR,isError}as const),

}


export const AuthThunk = (payload:PayloadT,chatName:string):ThunkT=>async(dispatch)=>{
    try{
        let data = await chatAPI.authAPI(payload)
        if(data.isAuth===0){
            dispatch(Actions.authAC(data.userName))
            emitJoinSocket(data.userName,chatName)
        }else {
            dispatch(Actions.errorAC(true))
        }
    }catch (e) {
        console.log('error AUTH:', e)
    }
}



export const GetChatThunk =(chatName:string):ThunkT=>async (dispatch)=>{
    try{
        let {messages} = await chatAPI.getChatAPI(chatName)
        dispatch(Actions.getMessagesAC(messages))
        dispatch(Actions.changeChatAC(chatName))
    }catch (e) {
        console.log('error GET CHAT:',e)
    }
}



export const emitJoinSocket=(userName:string,chatName:string)=>{
    const obj={
        userName,
        chatName
    }
    socket.emit('USER_JOIN',obj)
}

export const setUsersSocket =():SocketT=>(dispatch)=>{
    socket.on('SET_USERS',(users:Array<UserT>)=>{
        dispatch(Actions.getUsersAC(users))
    })
}
export const NewMessageThunk = (newMessage:MessageT)=>{
        socket.emit('NEW_MESSAGE_SOCKET',newMessage)


}
export const onNewMessageSocket=():SocketT=>dispatch=>{
    socket.on('ON_MESSAGE',(newMessage:MessageT)=>{
        dispatch(Actions.newMessagesAC(newMessage))
    })
}
export const emitDeleteMessagesSocket=(deleteMessageObj:deleteMessageObjT)=>{
    socket.emit('DELETE_MESSAGE',deleteMessageObj)
}
export const emitEditMessageSocket=(editMessageObj:editMessageObjT)=>{
    socket.emit('EDIT_MESSAGE',editMessageObj)
}
export const onSetMessage=():SocketT=>dispatch=>{
    socket.on('SET_MESSAGE',(messages:Array<MessageT>)=>{
        dispatch(Actions.getMessagesAC(messages))
    })
}


type ThunkT=BaseThunkType<ActionsTypes>

type SocketT=SocketType<ActionsTypes>






