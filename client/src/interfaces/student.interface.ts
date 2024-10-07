export interface IStudent {
    _id: string,
    full_name: string,
    description: string,
    email: string,
    personal_email:string,
    campus: string,
    faculty: string,
    image: string,
    MSSV: string,
}

export interface ICreateANewStudent {
    full_name: string,
    description: string,
    email: string,
    personal_email:string,
    campus: string,
    faculty: string,
    image: string,
    MSSV: string,
}

export interface ISearchStudentByMSSV {
    MSSV: string,
}

export interface IGetStudentById {
    _id: string,
}