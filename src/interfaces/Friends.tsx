// Types
import { User } from "./interfaces";
import { Wish } from "./WishTypes";

export interface InvitationInterface {
    _id: string;
    sender: User;
    receiver: User;
}

export interface ReceivedInvitation {
    _id: string;
    sender: {
        _id: string;
        username: string;
        email: string;
    };
    receiver?: {
        _id: string;
        username: string;
        email: string;
    };
}

export interface SentInvitation {
    _id: string;
    sender?: {
        _id: string;
        username: string;
        email: string;
    };
    receiver: {
        _id: string;
        username: string;
        email: string;
    };
}

export type OtherUsersWishes = {
    userId: string;
    wishesList: Wish[];
}[];
