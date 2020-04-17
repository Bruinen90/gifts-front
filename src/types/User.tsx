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
    draws?: string[];
    wishes?: string[];
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

export type UsersListType = User[] | [];

export type UsersListTypesType = "addingUsers" | "removingUsers";