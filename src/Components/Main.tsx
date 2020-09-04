import React, {useEffect, useRef} from "react";
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {Chat} from "./Chat";
import {
    emitEditMessageSocket,
    emitJoinSocket,
    GetChatThunk,
    NewMessageThunk,
    onNewMessageSocket, onSetMessage,
    setUsersSocket
} from "../Redux/Actions";

import close from '../img/icons/close.png'
import complete from '../img/icons/complete.png'
import send from '../img/icons/send.png'
import smile from'../img/icons/smile.png'

import {BaseEmoji, Picker} from 'emoji-mart'
import {AppStateT} from "../Redux/Store";
import {UserT} from "../Types";


export const MainBlock = styled.div`
color: #fff;
font-size: 25px;
display: grid;
grid-template-areas: 
"userInfo chat"
"rooms chat"
"users chat"
"users newMessage";
grid-template-rows: 50px 150px 400px 80px;
grid-template-columns: 200px 700px;
`
export const UserInfoBlock = styled.div`
grid-area: userInfo;
background: #434753;
border-bottom: 1px solid gray;
display: flex;
flex-direction: column;
justify-content: left;
align-items: flex-start;
padding: 10px;

`
export const Rooms = styled.div`
grid-area: rooms;
background: #434753;
border-bottom: 1px solid gray;
display: flex;
flex-direction: column;
justify-content: left;
align-items: flex-start;

b{
margin:0 0 0 10px;
}

`
export const WorkRoom = styled.div<{bgColor:string}>`
padding: 15px;
width: 90%;
height: 25px;
background: ${props => props.bgColor};
transition: .5s ease-in;
&:hover{
cursor: pointer;
background: #6190fb;
}
`
export const FloodRoom = styled.div<{bgColor:string}>`
background: ${props => props.bgColor};
padding: 15px;
width: 100%;
height: 30px;
transition: .5s ease-in;
&:hover{
cursor: pointer;
background: #6190fb;
}
`

export const Users = styled.div`
grid-area: users;
background: #434753;
border-bottom: 1px solid gray;
display: flex;
flex-direction: column;
justify-content: left;
align-items: flex-start;
padding: 10px;
b{
margin: 0;
}
div{
margin: 0 10px 10px 10px;
}
`
export const ChatBlock = styled.div`
grid-area: chat;
background: #f1f5f8;
border-bottom: 1px solid gray;
color:#000;
font-size: 22px;

`

export const NewMessage = styled.div`
position: relative;
grid-area: newMessage;
background: #f1f5f8;
display: flex;
padding: 10px;


`
export const Buttons = styled.div`
display: flex;
Button{
margin-right: 5px;
}
`
export const Button = styled.img`
    width: 40px;
    height: 40px;
    padding: 5px 0 0 10px;
    transition: .5s ease;
    &:hover{
    cursor: pointer;
    }
`



export const TextareaMessage = styled.textarea<any>`
width: 90%;
height: 90%;
overflow-y: auto;
background: #fff;
border-radius: 10px;
resize: none;
font-size: 20px;
padding: 5px 0 0 5px;
`
export const User = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
div{
color:#71757f;
font-size: 20px;
font-weight: 500;
display: flex;
justify-content: center;
align-items: baseline;
margin: 0 5px;
max-width: 100px;
}
`
export const Indicator = styled.div<{indicator:string}>`
width: 10px;
height: 10px;
border-radius: 100%;
background: ${props => props.indicator === 'online' ? '#62bf6e' : '#d51515'};
`
type PropsT={}

export const Main:React.FC<PropsT> = () => {
    const [messageValue, setMessageValue] = React.useState('')
    const [showEditButton, setShowEditButton] = React.useState(false)
    const [messageId, setMessageId] = React.useState(0)
    const [showEmoji, setShowEmoji] = React.useState(false)
    const [style, setStyle] = React.useState({
        work: 'transparent',
        flood: 'transparent'
    })


    const inputEl = useRef<any>(null)

    const users = useSelector<AppStateT,Array<UserT>>(state => state.Reducer.users)
    const userName = useSelector<AppStateT,string>(state => state.Reducer.userName)
    const chatName = useSelector<AppStateT,string>(state => state.Reducer.chatName)

    const dispatch = useDispatch()


    const newMessage = {
        userName,
        message: messageValue,
        chatName,
        id:0
    }
    const ChatUsers = users.map(m => <User key={m.userName}>
        <span>{m.userName}</span>
        <div>
            {m.status === 'online' ? <Indicator indicator='online'/> : <Indicator indicator='offline'/>}
            {m.status}
        </div>
    </User>)


    const onChangeFloodChat = () => {
        dispatch(GetChatThunk('flood'))
        emitJoinSocket(userName, 'flood')
        setStyle({
            work: 'transparent',
            flood: '#61dafb'
        })
        cancelEditMessage()
    }
    const onChangeWorkChat = () => {
        dispatch(GetChatThunk('work'))
        emitJoinSocket(userName, 'work')
        setStyle({
            work: '#61dafb',
            flood: 'transparent'
        })
        cancelEditMessage()
    }
    const sendMessage = () => {
        if(messageValue){
        NewMessageThunk(newMessage)
        setMessageValue('')
}
    }
    const sendEditMessage = () => {
        const editMessageObj = {
            chatName,
            messageId,
            newMessage: messageValue
        }
        emitEditMessageSocket(editMessageObj)
        setShowEditButton(false)
        setMessageValue('')
    }

    const cancelEditMessage = () => {
        setShowEditButton(false)
        setMessageValue('')
    }
    const addEmoji= (emojiTag:BaseEmoji)=>setMessageValue(messageValue+emojiTag.native)

    const ShowEmoji = ()=>setShowEmoji(true)

    const closeEmoji = ()=>setShowEmoji(false)



    useEffect(() => {
        dispatch(onNewMessageSocket())
        dispatch(onSetMessage())
        dispatch(setUsersSocket())
    }, [dispatch])

    return <MainBlock>
        <UserInfoBlock>
            <div>{userName}</div>
        </UserInfoBlock>
        <Rooms>
            <b>rooms:</b>
            <WorkRoom bgColor={style.work} onClick={onChangeWorkChat}>work chat</WorkRoom>
            <FloodRoom bgColor={style.flood} onClick={onChangeFloodChat}>flood chat</FloodRoom>
        </Rooms>
        <Users>
            <b>users:</b>
            <div>{ChatUsers}</div>
        </Users>
        <ChatBlock>
            <Chat inputEl={inputEl}
                  setMessageId={setMessageId}
                  setShowEditButton={setShowEditButton}
                  setMessageValue={setMessageValue}/>
        </ChatBlock>
        <NewMessage>
            {chatName !== 'start' && <>
                <TextareaMessage ref={inputEl}
                                 value={messageValue}
                                 onChange={(e:React.FormEvent<HTMLInputElement>) => setMessageValue(e.currentTarget.value)}
                />
                <div onMouseLeave={closeEmoji}>
                {showEmoji &&
                        <Picker
                    set='apple'
                    title="Escolha o emoji"
                    onSelect={(emojiTag:BaseEmoji)=>addEmoji(emojiTag)}
                    style={{position: 'absolute',
                        top: '-412px',
                        right:' 90px'}}
                />
                }
                <Button onMouseOver={ShowEmoji} alt='smiles' src={smile}/>
                </div>
                <Buttons>

                    {!showEditButton
                        ? <Button alt='send_message' src={send} onClick={sendMessage}/>
                        : <>
                            <Button alt='complete edit message' src={complete} onClick={sendEditMessage}/>
                            <Button alt='cancel edit message' src={close} onClick={cancelEditMessage}/>
                        </>
                    }
                </Buttons>
            </>}
        </NewMessage>
    </MainBlock>
}

