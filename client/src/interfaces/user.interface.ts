export enum ERole {
    Editor = "editor",
    Teacher = "teacher",
    Admin = "admin",
  }

 export interface IUserLogin {
    email: string;
    password: string;
  }

export interface IGetAllAccounts {
  _id: string,
  email: string,
  full_name: string,
  role: string,
}

export interface ICreateANewAccount {
  email: string;
  password: string;
  role: string,
  full_name: string,
}

export interface IGetUerProfile {
  email: string;
  role: string;
  avatar: string;
}
