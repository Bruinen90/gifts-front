import { InvitationInterface, OtherUsersWishes } from "./Friends";
import { DrawInterface } from "./Draw";
import { User } from "./User";
import { Wish } from "./WishTypes";

export interface State {
    auth: AuthState;
    draw: DrawState;
    wish: WishState;
    friends: FriendsState;
    errors: ErrorsState;
}

export interface Action {
    type: string;
    payload?: any;
}

export interface AuthState {
    username?: string;
    email?: string;
    token?: string;
    _id?: string;
    loginError?: string;
}

export interface DrawState {
    usersDraws: DrawInterface[];
    lastDeletedDraw?: string;
    error?: string;
}

export interface WishState {
    usersWishes?: Wish[];
    othersWishes?: OtherUsersWishes;
    shoppingList?: Wish[];
}

export interface FriendsState {
    friends?: User[];
    invitations?: {
        received?: InvitationInterface[];
        sent?: InvitationInterface[];
    };
}

export interface ErrorsState {
    auth?: string;
    draws?: string;
    friends?: string;
    wishes?: string;
    other?: string;
}
