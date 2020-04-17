import { InvitationInterface, OtherUsersWishes } from "./Friends";
import { DrawInterface } from "./Draw";
import { User } from "./User";
import { Wish } from "./WishTypes";

export interface StateInterface {
    username?: string;
    email?: string;
    userId?: string;
    token?: string;
    usersDraws: DrawInterface[];
    usersWishes?: Wish[];
    othersWishes?: OtherUsersWishes;
    loginError?: string;
    lastDeletedDraw?: string;
    friends?: User[];
    invitations?: {
        received?: InvitationInterface[];
        sent?: InvitationInterface[];
    };
    shoppingList?: Wish[];
}
