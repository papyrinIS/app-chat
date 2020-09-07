import React from "react";
import styled from "styled-components"
import {useDispatch, useSelector} from "react-redux";
import {Actions, AuthThunk} from "../Redux/Actions";
import {AppStateT} from "../Redux/Store";
import {PayloadT} from "../Types";


export const LoginForm = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 350px;
height: 400px;
background: #fff;
font-size: 14px;
border:2px solid #000;
box-shadow: 0 0 10px rgba(0,0,0,0.5);
`
export const LoginInput = styled.input`
background: #f2f2f2;
height: 30px;
font-size: 14px;
padding-left: 10px;
margin-bottom: 20px;
width: 90%;
outline: none;
`
export const ButtonLogin = styled.button`
margin-top: 20px;
width: 95%;
height: 35px;
font-size: 14px;
background: #2395f3;
outline: none;
transition:.5s ease-in;
&:hover{
cursor: pointer;
background: #2375f3;
}
`

export const ErrorBlock = styled.div`
width: 90%;
    display: flex;
    justify-content: center;
    color: red;
    height: 20px;
    font-weight: bolder;
`

type PropsT={}
export const Login:React.FC<PropsT> = () => {

    const [loginValue, setLoginValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')
    const dispatch = useDispatch()
    const chatName = useSelector<AppStateT,string>(state =>state.Reducer.chatName)
    const isError = useSelector<AppStateT,boolean>(state =>state.Reducer.isError)





    const payload:PayloadT={
        loginValue,
        passwordValue
    }
    const onEnter = () => {
        dispatch(AuthThunk(payload,chatName))
    }

    setTimeout(()=>dispatch(Actions.errorAC(false)),5000)

    return <LoginForm>
        <LoginInput placeholder='login' value={loginValue} onChange={(e) => setLoginValue(e.currentTarget.value)}/>
        <LoginInput  placeholder='password' type='password' value={passwordValue}
                    onChange={(e) => setPasswordValue(e.currentTarget.value)}/>
        <ErrorBlock>{isError &&
        <div>
            неверный логин или пароль
        </div>
        }</ErrorBlock>
        <ButtonLogin onClick={onEnter}>enter</ButtonLogin>
    </LoginForm>
}