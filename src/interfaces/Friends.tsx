// Types
import { User } from "./interfaces";

export interface InvitationInterface {
    _id?: string;
    sender: User;
    receiver: User;
}

export interface InvitationFromDB {
    _id: string;
    sender?: {
        _id?: string;
        username?: string;
        email?: string;
    };
    receiver?: {
        _id?: string;
        username?: string;
        email?: string;
    };
}
