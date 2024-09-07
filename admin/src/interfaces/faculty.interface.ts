export interface IFaculty {
    _id: string,
    name: string,
    campus: string,
    description: string,
}

export interface ICreateANewFaculty {
    name: string,
    campus: string,
    description: string,
}