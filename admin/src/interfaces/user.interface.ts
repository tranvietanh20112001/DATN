export enum ERole {
    Editor = "editor",
    Teacher = "teacher",
    Admin = "admin",
  }

 export interface IUserLogin {
    email: string;
    password: string;
  }