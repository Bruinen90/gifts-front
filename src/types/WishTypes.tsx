import { User } from "./User";
import { DrawInterface } from "./Draw";
import { ReservationStatusSetterType } from "./Reservations";
import { LoadingState } from "./State";

export type WishViewTypes = "full" | "simple" | "withDrawData";

export interface WishInput {
    title: string;
    link: string;
    description: string;
    price: number | string;
    _id?: string;
}

export interface Wish extends WishInput {
    _id: string;
    creator: string | User;
    price: number;
    buyer?: string;
    reserved?: boolean;
    forDraw?: string;
    imageUrl?: string;
    updatedAt: Date | string;
}

export interface WishWithDrawData extends Wish {
    drawData?: DrawInterface;
}

export interface WishesListProps {
    wishesList: WishWithDrawData[];
    viewMode: "creator" | "guest";
    setReservedStatus?: ReservationStatusSetterType;
    inModal?: boolean;
}

export interface WishBoxProps {
    wish: Wish;
    view: WishViewTypes;
    deleteWish?: () => void;
    setReservedStatus: ReservationStatusSetterType | undefined;
    drawData?: DrawInterface | undefined;
    oneColumn?: boolean;
}
