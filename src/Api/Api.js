import axios from 'axios'



export const chatAPI = {
    authAPI(payload) {
        return axios.post(`/auth`, {payload}).then(res => res.data)
    },
    getChatAPI(chatName){
        return axios.get(`/chat/${chatName}`).then(res=>res.data)
    }
}