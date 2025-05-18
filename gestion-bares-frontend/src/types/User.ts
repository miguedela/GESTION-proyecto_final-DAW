import { IRestaurant } from "./Restaurants";

export enum Roles {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
}

export interface IUser {
  id: string;
  name: string;
  surnames: string;
  email: string;
  telephone: string;
  role: Roles;
  emailVerified: boolean;
  emailNotifications: boolean;
  creationDate: Date;
  restaurant?: IRestaurant[];
}

export interface IRegisterUser {
  name: string;
  surnames: string;
  email: string;
  telephone: string;
  password: string;
  role: Roles;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
