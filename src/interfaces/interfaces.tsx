export interface DrawInterface {
    _id?: string;
    title: string;
    price: number;
    date: Date | string;
    creatorsId: string;
    participantsIds: string[];
    results?: User;
}

export interface StateInterface {
    username?: string;
    email?: string;
    userId?: string;
    token?: string;
    usersDraws: DrawInterface[];
    loginError?: string;
}

export interface LoginDataInterface {
    username: string;
    password: string;
}

export interface BasicUser {
    username: string;
    email?: string;
}

export interface User extends BasicUser {
    _id: string;
    password?: string;
    draws?: String[];
    wishes?: String[];
}

export interface PopulatedInterface extends DrawInterface {
    _id: string;
    creatorsID?: string;
    participants?: User[];
}

export type SearchState =
    | "too-short"
    | "loading"
    | "no-results"
    | "display-results"
    | "error";

export interface SearchResultsBoxProps {
    searchState: SearchState;
}

export type DrawsList = DrawInterface[];

export type UsersListType = User[] | [];

export type UsersListTypesType = "addingUsers" | "removingUsers";
