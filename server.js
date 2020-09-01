const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json())


const chat = {
    authData: [
        {
            login: '1',
            password: '1',
            userName: 'user1',
            userId: '1'
        },
        {
            login: '2',
            password: '2',
            userName: 'user2',
            userId: '2'
        },
        {
            login: '3',
            password: '3',
            userName: 'user3',
            userId: '3'
        }
    ],
    users: [
        {
            userName: 'user1',
            status: 'offline',
            id: 1
        },
        {
            userName: 'user2',
            status: 'offline',
            id: 2
        },
        {
            userName: 'user3',
            status: 'offline',
            id: 3
        },
    ],
    workChatMessages: [
        {
            userName: 'user1',
            message: 'hello',
            id: '1'
        },
        {
            userName: 'user2',
            message: 'hi:)',
            id: '2'
        },
    ],
    floodChatMessages: [
        {
            userName: 'user2',
            message: 'hello,flood chat',
            id: '1'
        },
        {
            userName: 'user3',
            message: 'lol kek',
            id: '2'
        },
    ]
}
app.get('/chat/:chatName', (req, res) => {

    const {chatName} = req.params


    const workChat = {
        messages: [...chat.workChatMessages]
    }
    const floodChat = {
        messages: [...chat.floodChatMessages]
    }
    const startChat = {
        messages: []
    }
    if (chatName === 'work') {
        res.json(workChat)
    }
    if (chatName === 'flood') {
        res.json(floodChat)
    }
    if (chatName === 'start') {
        res.json(startChat)
    }
})


app.post('/auth', (req, res) => {

    const {loginValue, passwordValue} = req.body.payload
    const auth = chat.authData.filter(f => f.login === loginValue && f.password === passwordValue)
    if (auth.length === 1) {
        const data = {
            userName: auth[0].userName,
            isAuth: 0
        }
        res.json(data)
    } else {
        const data = {
            userName: null,
            isAuth: 1
        }
        res.json(data)
    }

})


io.on('connection', socket => {

    console.log('user connected:', socket.id)
    socket.on('USER_JOIN', ({chatName, userName}) => {
        socket.join(chatName)
        chat.users.filter(f => {
            if (f.userName === userName) {
                return f.status = 'online', f.id = socket.id
            }
        })
        const users = chat.users
        io.sockets.in(chatName).emit('SET_USERS', users)
    })


    socket.on('disconnect', () => {
        chat.users.filter(f => {
            if (f.id === socket.id)
                return f.status = 'offline'
        })
        io.sockets.emit('SET_USERS', chat.users)
    })

    socket.on('NEW_MESSAGE_SOCKET', newMessage => {
        socket.join(newMessage.chatName)
        const message = {
            userName: newMessage.userName,
            message: newMessage.message,
            id: Math.random()
        }
        if (newMessage.chatName === 'work') {
            chat.workChatMessages = [...chat.workChatMessages, message]
        }
        if (newMessage.chatName === 'flood') {
            chat.floodChatMessages = [...chat.floodChatMessages, message]
        }
        io.sockets.to(newMessage.chatName).emit('ON_MESSAGE', message)
    })


    socket.on('DELETE_MESSAGE', ({chatName, messageId}) => {
        socket.join(chatName)
        let messages

        if (chatName === 'work')
            messages = chat.workChatMessages = chat.workChatMessages.filter(f => f.id !== messageId)


        if (chatName === 'flood')
            messages = chat.floodChatMessages = chat.floodChatMessages.filter(f => f.id !== messageId)

        io.sockets.to(chatName).emit('SET_MESSAGE', messages)
    })


    socket.on('EDIT_MESSAGE', ({chatName, messageId, newMessage}) => {
        socket.join(chatName)

        let messages
        if (chatName === 'work') {
            chat.workChatMessages.filter(f => {
                if (f.id === messageId) {
                    f.message = newMessage
                }
            })
            messages = chat.workChatMessages
        }
        if (chatName === 'flood') {
            chat.floodChatMessages.filter(f => {
                if (f.id === messageId) {
                    f.message = newMessage
                }
            })
            messages = chat.floodChatMessages
        }
        io.sockets.to(chatName).emit('SET_MESSAGE', messages)
    })

})

server.listen(3111, err => {
    if (err) {
        throw Error(err)
    }
    console.log('server started:)')
})

