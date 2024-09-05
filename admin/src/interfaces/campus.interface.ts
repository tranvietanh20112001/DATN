export interface ICampus {
    _id : string,
    name: string,
    description: string,
    location: string,
    image: string,
}

export interface ICreateANewCampus {
    name: string,
    description: string,
    location: string,
    image: File | null,
} 