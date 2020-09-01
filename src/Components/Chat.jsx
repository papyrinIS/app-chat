import React, {useRef, useState} from "react";
import styled, {css} from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {emitDeleteMessagesSocket} from "../Redux/Actions";


import {PopUpOptions} from "./PopUpOptions";
import useClickOutside from "click-outside-hook";

export const ChatWrapper = styled.div`
height: 658px;
overflow-x: hidden;
overflow-y: auto;
padding: 10px 10px 30px 10px;
display: flex;
flex-direction: column;





`
export const MessageWrapper = styled.div`
padding:5px 10px;
display: flex;
flex-direction: column;
${props => props.positionMessage === 'left' ? css`
-webkit-align-items: flex-start;
`
    : css`
-webkit-align-items: flex-end;
`}

`


export const Message = styled.div`
position: relative;
display: flex;
background: #62bf6e;
max-width: 75%;
padding:10px 15px;
word-break: break-all;
border-radius: 15px;
transition: .5s ease;
${props => props.me && css`
&:hover{
cursor: pointer;
background: #62f06e;
}`
}
`
export const Name = styled.div`
margin: 0 10px;
font-size: 15px;
color:#222422;
`


export const Chat = ({setMessageValue, setShowEditButton, setMessageId, inputEl}) => {

    const messagesRef = useRef(0)

    const messages = useSelector(state => state.Reducer.messages)

    React.useEffect(() => {
        messagesRef.current.scroll(0, messagesRef.current.scrollHeight);
    }, [messages])


    const ChatMessages = messages.map(m => <OneMessage setMessageValue={setMessageValue}
                                                       setShowEditButton={setShowEditButton}
                                                       setMessageId={setMessageId}
                                                       inputEl={inputEl}
                                                       key={m.id}
                                                       m={m}/>)
    return <ChatWrapper ref={messagesRef}>
        {ChatMessages}
    </ChatWrapper>
}


export const OneMessage = ({setMessageValue, setShowEditButton, setMessageId, inputEl, m}) => {

    const [showPopUp, setShowPopUp] = useState(false)


    const chatName = useSelector(state => state.Reducer.chatName)
    const userName = useSelector(state => state.Reducer.userName)


    const dispatch = useDispatch()

    const deleteMessage = () => {
        const deleteMessageObj = {
            chatName,
            messageId: m.id
        }
        setShowEditButton(false)
        emitDeleteMessagesSocket(deleteMessageObj)
        setShowPopUp(false)
    }


    const editMessage = () => {
        setShowPopUp(false)
        setMessageValue(m.message)
        setShowEditButton(true)
        inputEl.current.focus();
        setMessageId(m.id)

    }

    const visiblePopUp = () => {
        setShowPopUp(true)
    }
    const closePopUp = () => {
        setShowPopUp(false)
    }
    const ref = useClickOutside(() => setShowPopUp(false))

    if (userName !== m.userName) {
        return <MessageWrapper positionMessage='left'>
            <Message>{m.message}</Message>
            <Name>{m.userName}</Name>
        </MessageWrapper>
    }
    if (userName === m.userName) {
        return <MessageWrapper>
            <Message me onMouseLeave={closePopUp} onClick={visiblePopUp}>{m.message}
                {showPopUp &&
                <PopUpOptions
                    editMessage={editMessage}
                    deleteMessage={deleteMessage}/>
                }
            </Message>
            <Name>{m.userName}</Name>

        </MessageWrapper>
    }
}