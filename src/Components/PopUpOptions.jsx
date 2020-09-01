import React from "react";
import styled from"styled-components"

import deleteIcon from '../img/icons/deleteIcon.png'
import editIcon from '../img/icons/editIcon.png'

export const PopupBlock=styled.div`
width: 170px;
height: 102px;
font-size: 18px;
background: #b4deee;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
position: absolute;
z-index: 10;
top:45%;
left: -150px;
margin-top: 20px;

`
export const EditBlock=styled.div`
padding-left: 10px;
width: 160px;
height: 50px;
border-bottom: 2px solid gray;
display: flex;
justify-content: left;
align-items: center;
transition: .5s easy;
&:hover{
cursor: pointer;
background: #b4beee;
}

`
export const DeleteBlock=styled.div`
padding-left: 10px;
width: 160px;
height: 50px;
display: flex;
justify-content: left;
align-items: center;
transition: .5s easy;
&:hover{
cursor: pointer;
background: #b4beee;
}
`

export const IconDelete=styled.img`

height: 20px;
width: 20px;
transition: .5s ease;
    &:hover{
    cursor: pointer;
    }
`
export const IconEdit=styled.img`
height: 20px;
width: 20px;
transition: .5s ease;
    &:hover{
    cursor: pointer;
    }
`



export const PopUpOptions = ({editMessage,deleteMessage})=>{

    return<PopupBlock >
        <EditBlock onClick={editMessage}>
            <IconEdit alt='edit message icon' src={editIcon} />
            edit message
        </EditBlock>
        <DeleteBlock onClick={deleteMessage}>
            <IconDelete alt='delete message icon' src={deleteIcon} />
            delete message
        </DeleteBlock>
    </PopupBlock>
}