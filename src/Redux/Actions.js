import {AUTH, CHANGE_CHAT, GET_MESSAGES, GET_USERS, NEW_MESSAGE} from "./Reducer";
import {chatAPI} from "../Api/Api";
import {socket} from "../socket";

export const Actions= {
    authAC: (userName) => ({type: AUTH, userName}),
    getMessagesAC:(messages)=>({type:GET_MESSAGES,messages}),
    getUsersAC:(users)=>({type:GET_USERS,users}),
    changeChatAC:(chatName)=>({type:CHANGE_CHAT,chatName}),
    newMessagesAC:(newMessages)=>({type:NEW_MESSAGE,newMessages})
}


export const AuthThunk = (payload,chatName)=>async(dispatch)=>{
    try{
        let data = await chatAPI.authAPI(payload)
        if(data.isAuth===0){
            dispatch(Actions.authAC(data.userName))
            emitJoinSocket(data.userName,chatName)
        }else{
            alert('error auth')
        }
    }catch (e) {
        console.log('error AUTH:', e)
    }
}



export const GetChatThunk =(chatName)=>async (dispatch)=>{
    try{
        let {messages} = await chatAPI.getChatAPI(chatName)
        dispatch(Actions.getMessagesAC(messages))
        dispatch(Actions.changeChatAC(chatName))
    }catch (e) {
        console.log('error GET CHAT:',e)
    }
}



export const emitJoinSocket=(userName,chatName)=>{
    const obj={
        userName,
        chatName
    }
    socket.emit('USER_JOIN',obj)
}

export const setUsersSocket =()=>(dispatch)=>{
    socket.on('SET_USERS',users=>{
        dispatch(Actions.getUsersAC(users))
    })
}
export const NewMessageThunk = newMessage=>{
        socket.emit('NEW_MESSAGE_SOCKET',newMessage)


}
export const onNewMessageSocket=()=>dispatch=>{
    socket.on('ON_MESSAGE',newMessage=>{
        dispatch(Actions.newMessagesAC(newMessage))
    })
}
export const emitDeleteMessagesSocket=(deleteMessageObj)=>{
    socket.emit('DELETE_MESSAGE',deleteMessageObj)
}
export const emitEditMessageSocket=(editMessageObj)=>{
    socket.emit('EDIT_MESSAGE',editMessageObj)
}
export const onSetMessage=()=>dispatch=>{
    socket.on('SET_MESSAGE',messages=>{
        dispatch(Actions.getMessagesAC(messages))
    })
}






