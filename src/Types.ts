export type editMessageObjT = {
    chatName:string,
    messageId:number,
    newMessage: string
}

export type PayloadT={
    loginValue:string
    passwordValue:string
}

export type MessageT={
    userName:string
    message:string
    id:number,
    chatName?:string
}

export type UserT={
    userName: string,
    status: string,
    id: number
}


export type deleteMessageObjT = {
    chatName:string,
    messageId?: number
}

