import { InvitationInterface, OtherUsersWishes } from "./Friends";
import { DrawInterface } from "./Draw";
import { User } from "./User";
import { Wish } from "./WishTypes";

export interface Action {
    type: string;
    payload?: any;
}

export interface AuthState {
    username?: string;
    email?: string;
    token?: string;
    userId?: string;
    loginError?: string;
}

export interface DrawState {
    usersDraws: DrawInterface[];
    lastDeletedDraw?: string;
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
