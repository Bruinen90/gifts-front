import * as actionTypes from "./actions/actionTypes";
import { DrawInterface, StateInterface } from "../interfaces/interfaces";

// Types
import { Wish } from "../interfaces/WishTypes";
import { ReceivedInvitation, SentInvitation } from "../interfaces/Friends";
import { User } from "../interfaces/interfaces";

interface actionInterface {
    type: string;
    [key: string]: any;
}

const initalState: StateInterface = {
    usersDraws: [],
};

const reducer = (
    state = initalState,
    action: actionInterface
): StateInterface => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            const { username, email, token, userId } = action.payload;
            return {
                ...state,
                username: username,
                email: email,
                token: token,
                userId: userId,
                loginError: undefined,
            };
        case actionTypes.USER_LOGIN_FAILED:
            console.log("LOGIN FAILED");
            return {
                ...state,
                loginError: action.payload.message,
            };
        case actionTypes.USER_LOGOUT:
            const loggedOutState = { ...state };
            // Better set default state - change in refactor
            delete loggedOutState.username;
            delete loggedOutState.email;
            delete loggedOutState.token;
            delete loggedOutState.userId;
            delete loggedOutState.usersDraws;
            delete loggedOutState.usersWishes;
            delete loggedOutState.invitations;
            delete loggedOutState.friends;
            return { ...loggedOutState, usersDraws: [] };
        case actionTypes.CREATE_DRAW:
            const newDraw: DrawInterface = action.payload;
            return {
                ...state,
                usersDraws: state.usersDraws
                    ? [...state.usersDraws, newDraw]
                    : [newDraw],
            };
        case actionTypes.DELETE_DRAW:
            return {
                ...state,
                usersDraws: [
                    ...state.usersDraws.filter(
                        (draw) => draw._id !== action.payload.drawId
                    ),
                ],
                lastDeletedDraw: action.payload.drawId,
            };
        case actionTypes.SET_DRAWS_LIST:
            return {
                ...state,
                usersDraws: action.payload.drawsList,
            };
        case actionTypes.CREATE_WISH:
            let usersWishes;
            if (state.usersWishes) {
                usersWishes = [...state.usersWishes, action.payload];
            } else {
                usersWishes = [action.payload];
            }
            return {
                ...state,
                usersWishes: usersWishes,
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
        case actionTypes.EXIT_DRAW:
            return {
                ...state,
                usersDraws: [...state.usersDraws!].filter(
                    (draw) => draw._id !== action.payload.drawId
                ),
            };
        case actionTypes.UPDATE_DRAW:
            const updatedDraw = action.payload;
            return {
                ...state,
                usersDraws: [...state.usersDraws!].map((draw) => {
                    if (draw._id !== updatedDraw._id) {
                        return draw;
                    } else {
                        return updatedDraw;
                    }
                }),
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
                }),
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
            return {
                ...state,
                usersDraws: [...state.usersDraws!].map((draw) => {
                    if (draw._id !== action.payload.drawId || !draw.results) {
                        return draw;
                    }
                    // Update gifts array for requested draw:
                    let updatedGiftsForFoundDraw: [] | undefined | Wish[];
                    const addedGift = [...draw.results.getterWishes!].find(
                        (wish) => wish._id === action.payload.wishId
                    )!;
                    if (!draw.results.gifts && action.payload.reserved) {
                        updatedGiftsForFoundDraw = [addedGift];
                    } else if (!action.payload.reserved) {
                        updatedGiftsForFoundDraw =
                            draw.results.gifts!.length > 1
                                ? [...draw.results.gifts!].filter(
                                      (gift) =>
                                          gift._id !== action.payload.wishId
                                  )
                                : undefined;
                    } else {
                        updatedGiftsForFoundDraw = [
                            ...draw.results.gifts!,
                            addedGift,
                        ];
                    }
                    // Update state
                    return {
                        ...draw,
                        results: {
                            ...draw.results,
                            gifts: updatedGiftsForFoundDraw,
                            getterWishes: draw.results.getterWishes
                                ? [...draw.results.getterWishes].map((wish) => {
                                      if (wish._id !== action.payload.wishId) {
                                          return wish;
                                      }
                                      return {
                                          ...wish,
                                          reserved: action.payload.reserved,
                                          buyer: action.payload.reserved
                                              ? state.userId
                                              : undefined,
                                      };
                                  })
                                : [],
                        },
                    };
                }),
            };
        case actionTypes.SET_CREATOR_RESULTS:
            const { drawId, results } = action.payload;
            return {
                ...state,
                usersDraws: [...state.usersDraws].map((draw) => {
                    if (draw._id === drawId) {
                        return {
                            ...draw,
                            results: results,
                        };
                    }
                    return draw;
                }),
            };
        case actionTypes.SET_DRAW_ARCHIVED:
            return {
                ...state,
                usersDraws: [...state.usersDraws].map((draw) => {
                    if (draw._id === action.payload.drawId) {
                        return {
                            ...draw,
                            status: "archived",
                        };
                    }
                    return draw;
                }),
            };
        case actionTypes.SEND_INVITATION:
            const newInvitation = {
                _id: action.payload._id as string,
                sender: {
                    _id: state.userId,
                    username: state.username,
                    email: state.email,
                } as User,
                receiver: action.payload.receiver as User,
            };
            return {
                ...state,
                invitations: {
                    received:
                        state.invitations && state.invitations.received
                            ? [...state.invitations.received]
                            : undefined,
                    sent:
                        state.invitations && state.invitations.sent
                            ? [...state.invitations.sent, newInvitation]
                            : [newInvitation],
                },
            };
        case actionTypes.SET_USER_INVITATIONS:
            const responseInvitations = action.payload as {
                received: ReceivedInvitation[];
                sent: SentInvitation[];
            };
            let receivedInvitations;
            if (responseInvitations.received) {
                receivedInvitations = responseInvitations.received.map(
                    (invitation) => ({
                        ...invitation,
                        receiver: {
                            _id: state.userId!,
                            username: state.username!,
                            email: state.email!,
                        },
                    })
                );
            }
            let sentInvitations;
            if (responseInvitations.sent) {
                sentInvitations = responseInvitations.sent.map(
                    (invitation) => ({
                        ...invitation,
                        sender: {
                            _id: state.userId!,
                            username: state.username!,
                            email: state.email!,
                        },
                    })
                );
            }
            return {
                ...state,
                invitations: {
                    received: receivedInvitations,
                    sent: sentInvitations,
                },
            };
        case actionTypes.SET_INVITATION_DECISION:
            const { invitationId, decision } = action.payload;
            const oldState = { ...state };
            if (decision === "accept") {
                const newFriend = state.invitations!.received!.find(
                    (invitation) => invitation._id === invitationId
                )!.sender;
                oldState.friends
                    ? oldState.friends.push(newFriend)
                    : (oldState.friends = [newFriend]);
            }
            if (decision === "cancel") {
                oldState.invitations!.sent = oldState.invitations!.sent!.filter(
                    (invitation) => invitation._id !== invitationId
                );
            } else {
                oldState.invitations!.received = oldState.invitations!.received!.filter(
                    (invitation) => invitation._id !== invitationId
                );
            }
            return oldState;
        case actionTypes.SET_USER_FRIENDS:
            return {
                ...state,
                friends: action.payload,
            };
        case actionTypes.CANCEL_FRIENDSHIP:
            console.log("REDUCER CANCELS FRIENDSHIP", action.payload);
            return {
                ...state,
                friends: state.friends!.filter(
                    (friend) => friend._id !== action.payload.friendId
                ),
            };
    }
    return state;
};

export default reducer;
