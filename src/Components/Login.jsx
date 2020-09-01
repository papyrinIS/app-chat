import React from "react";
import styled from "styled-components"
import {useDispatch, useSelector} from "react-redux";
import {AuthThunk} from "../Redux/Actions";


export const LoginForm = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 500px;
height: 600px;
background: #fff;
font-size: 30px;
border:2px solid #000;
box-shadow: 0 0 10px rgba(0,0,0,0.5);
`
export const LoginInput = styled.input`
background: #fff;
height: 50px;
font-size: 30px;
padding-left: 10px;
margin-bottom: 20px;
width: 400px;
outline: none;
`
export const ButtonLogin = styled.button`
margin-top: 45px;
width: 410px;
height: 55px;
font-size: 25px;
background: #2395f3;
outline: none;
transition:.5s ease-in;
&:hover{
cursor: pointer;
background: #2375f3;
}
`


export const Login = () => {

    const [loginValue, setLoginValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')
    const dispatch = useDispatch()
    const chatName = useSelector(state =>state.Reducer.chatName)





    const payload={
        loginValue,
        passwordValue
    }
    const onEnter = () => {
        dispatch(AuthThunk(payload,chatName))
    }

    return <LoginForm>
        <LoginInput placeholder='login' value={loginValue} onChange={(e) => setLoginValue(e.currentTarget.value)}/>
        <LoginInput  placeholder='password' type='password' value={passwordValue}
                    onChange={(e) => setPasswordValue(e.currentTarget.value)}/>
        <ButtonLogin onClick={onEnter}>enter</ButtonLogin>
    </LoginForm>
}