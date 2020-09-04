import React from 'react';
import './App.css';
import styled from 'styled-components'
import {Login} from "./Components/Login";
import {useSelector} from "react-redux";
import {Main} from "./Components/Main";
import {AppStateT} from "./Redux/Store";


export const AppWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
background: #29485f;
font-size: 30px;
`
type PropsT={}
const App:React.FC<PropsT>=() => {
  const isAuth = useSelector<AppStateT,boolean>(state=>state.Reducer.isAuth)


  return (
      <AppWrapper>
        {!isAuth?<Login/>:<Main/>}
      </AppWrapper>
  );
}

export default App;
