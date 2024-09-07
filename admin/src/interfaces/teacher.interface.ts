export interface ITeacher{
    _id: string,
    full_name: string,
    description: string,
    email: string,
    campus: string,
    faculty: string,
    image: string,
}

export interface ICreateANewTeacher{
    full_name: string,
    description: string,
    email: string,
    campus: string,
    faculty: string,
    image: string,
}