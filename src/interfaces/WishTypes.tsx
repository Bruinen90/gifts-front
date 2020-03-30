import { User } from "./interfaces";

export interface WishInput {
  title: string;
  link: string;
  description: string;
  price: number | string;
  _id?: string;
}

export interface Wish extends WishInput {
  _id: string;
  creator: string;
  price: number;
  buyer?: string;
  reserved?: boolean;
}

export interface WishesListProps {
  wishesList: Wish[];
  viewMode: "creator" | "guest";
  reserveWish?: any;
}
