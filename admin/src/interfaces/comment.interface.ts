export interface IComment{
    _id: string,
    projectId:string,
    userId: string,
    content: string,
    createdAt: Date,
}

export interface IUpdateComment{
    content: string,
}