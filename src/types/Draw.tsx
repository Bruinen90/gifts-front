import { Wish } from "./WishTypes";
import { User } from "./User";

export interface DrawResultsInterface {
    _id: string;
    username: string;
    email?: string;
    gifts?: Wish[] | undefined;
    getterWishes?: Wish[] | undefined;
}

export interface DrawInterface {
    _id?: string;
    title: string;
    price: number;
    date: Date | string;
    creator: User;
    participants?: User[];
    status: "pending" | "done" | "archived";
    results?: DrawResultsInterface;
}

export type DrawStatusType = "pending" | "done" | "archived";

export type DrawsList = DrawInterface[];

export type DrawFunction = (drawId: string, drawTitle: string) => void;

export interface DrawRowProps {
    date: Date;
    title: string;
    _id: string | undefined;
    results?: DrawResultsInterface;
    gifts?: Wish[];
    participants: [User];
    creator: User;
    adminMode: boolean;
    price: number;
    deleteDraw: DrawFunction;
    exitDraw: DrawFunction;
    runDraw: DrawFunction;
    archiveDraw: DrawFunction;
    status: DrawStatusType;
}
