import * as actionTypes from "../actions/actionTypes";

import { Action, WishState } from "../../types/State";
import { Wish } from "../../types/WishTypes";
import { OtherUsersWishes } from "../../types/Friends";

export default (state: WishState = {}, action: Action) => {
    switch (action.type) {
        case actionTypes.CREATE_WISH:
            let usersWishes;
            if (state.usersWishes) {
                usersWishes = [...state.usersWishes, action.payload];
            } else {
                usersWishes = [action.payload];
            }
            return {
                ...state,
                usersWishes: usersWishes.sort((wishA, wishB) => wishA.updatedAt > wishB.updatedAt ? -1 : 0),
            };
        case actionTypes.SET_USER_WISHES:
            return {
                ...state,
                usersWishes: action.payload,
            };
        case actionTypes.DELETE_WISH:
            return {
                ...state,
                usersWishes: [...state.usersWishes!].filter(
                    (wish) => wish._id !== action.payload.wishId
                ),
            };
        case actionTypes.UPDATE_WISH:
            const updatedWish = action.payload;
            return {
                ...state,
                usersWishes: [...state.usersWishes!].map((wish) => {
                    if (wish._id !== updatedWish._id) {
                        return wish;
                    } else {
                        return updatedWish;
                    }
                }).sort((wishA, wishB) => wishA.updatedAt > wishB.updatedAt ? -1 : 0),
            };
        case actionTypes.SET_OTHER_USER_WISHES:
            let othersWishes;
            if (state.othersWishes) {
                let alreadyExist = false;
                othersWishes = state.othersWishes.map((usersWishesObj) => {
                    if (usersWishesObj.userId === action.payload.userId) {
                        alreadyExist = true;
                        return {
                            ...usersWishesObj,
                            wishesList: action.payload.wishesList,
                        };
                    } else {
                        return usersWishesObj;
                    }
                });
                if (!alreadyExist) {
                    othersWishes.push({
                        userId: action.payload.userId,
                        wishesList: action.payload.wishesList,
                    });
                }
            } else {
                othersWishes = [
                    {
                        userId: action.payload.userId,
                        wishesList: action.payload.wishesList,
                    },
                ];
            }
            return {
                ...state,
                othersWishes: othersWishes,
            };
        case actionTypes.SET_WISH_STATUS:
            let updatedOtherUsersWishes: OtherUsersWishes | undefined;
            let addedGift: Wish | undefined = undefined;
            {
                const {
                    creatorId,
                    wishId,
                    reserved,
                    drawId,
                    loggedUser,
                } = action.payload;
                updatedOtherUsersWishes = state.othersWishes?.map(
                    (userWishesList) => {
                        if (userWishesList.userId === creatorId) {
                            const updatedWishesList = userWishesList.wishesList.map(
                                (wish) => {
                                    if (wish._id === wishId) {
                                        addedGift = {
                                            ...wish,
                                            reserved: reserved,
                                            buyer: loggedUser,
                                            creator: userWishesList.userId,
                                        };
                                        if (drawId) {
                                            addedGift.forDraw = drawId;
                                        }
                                        return addedGift;
                                    } else {
                                        return { ...wish };
                                    }
                                }
                            );
                            return {
                                userId: creatorId,
                                wishesList: updatedWishesList,
                            };
                        } else {
                            return userWishesList;
                        }
                    }
                );
            }
            let updatedShoppingList = state.shoppingList
                ? [...state.shoppingList]
                : [];
            if (!addedGift) {
                // Others wishes are not fetched - gift must be canceled from "Shopping list - search there"
                addedGift = state.shoppingList!.find(
                    (gift) => gift._id === action.payload.wishId
                );
                addedGift!.reserved = action.payload.reserved;
            }
            if (!addedGift!.reserved) {
                updatedShoppingList = state.shoppingList!.filter(
                    (listItem) => listItem._id !== addedGift!._id
                );
            } else {
                updatedShoppingList.push(addedGift!);
            }
            return {
                ...state,
                othersWishes: updatedOtherUsersWishes,
                shoppingList: updatedShoppingList,
            };
        case actionTypes.SET_SHOPPING_LIST:
            if (!action.payload.shoppingList) {
                return state;
            }
            return {
                ...state,
                shoppingList: action.payload.shoppingList.map(
                    (listItem: Wish) => ({
                        ...listItem,
                        buyer: action.payload.loggedUser,
                        reserved: true,
                    })
                ),
            };
        default:
            return state;
    }
};
