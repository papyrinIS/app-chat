import axios from 'axios'
import {PayloadT} from "../Types";



export const chatAPI = {
    authAPI(payload:PayloadT) {
        return axios.post(`/auth`, {payload}).then(res => res.data)
    },
    getChatAPI(chatName:string){
        return axios.get(`/chat/${chatName}`).then(res=>res.data)
    }
}


