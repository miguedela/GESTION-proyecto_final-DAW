// Interfaces equivalentes a los DTOs de la API

export interface IUser {
    name: string;
    surnames: string;
    email: string;
    telephone: string;
    role: "ADMIN" | "CUSTOMER" | "STAFF";
    emailVerified: boolean;
    emailNotifications: boolean;
    creationDate: Date;
}

export interface IRegisterUser {
    name: string;
    surnames: string;
    email: string;
    telephone: string;
    password: string;
    emailNotifications: boolean;
    role: "ADMIN" | "CUSTOMER" | "STAFF";
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface ILoginResponse {
    user: IUser;
    token: string;
}

// Futuro enum
// enum Roles {
//     "ADMIN", "CUSTOMER", "STAFF"
// }