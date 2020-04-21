import * as actionTypes from '../actions/actionTypes';

import { Action, FriendsState } from '../../types/State';
import { User } from '../../types/User';
import { ReceivedInvitation, SentInvitation } from '../../types/Friends';

export default (state: FriendsState = {}, action: Action) => {
	switch (action.type) {
		case actionTypes.SEND_INVITATION:
			const newInvitation = {
				_id: action.payload._id as string,
				sender: action.payload.loggedUser,
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
				loggedUser: User;
			};
			let receivedInvitations;
			if (responseInvitations.received) {
				receivedInvitations = responseInvitations.received.map(
					invitation => ({
						...invitation,
						receiver: responseInvitations.loggedUser,
					})
				);
			}
			let sentInvitations;
			if (responseInvitations.sent) {
				sentInvitations = responseInvitations.sent.map(invitation => ({
					...invitation,
					sender: responseInvitations.loggedUser,
				}));
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
			console.log(action.payload);
			const oldState = { ...state };
			if (decision === 'accept') {
				const newFriend = state.invitations!.received!.find(
					invitation => invitation._id === invitationId
				)!.sender;
				oldState.friends
					? oldState.friends.push(newFriend)
					: (oldState.friends = [newFriend]);
			}
			if (decision === 'cancel') {
				console.log('canceling invitation');
				oldState.invitations!.sent = oldState.invitations!.sent!.filter(
					invitation => invitation._id !== invitationId
				);
			} else {
				oldState.invitations!.received = oldState.invitations!.received!.filter(
					invitation => invitation._id !== invitationId
				);
			}
			return oldState;
		case actionTypes.SET_USER_FRIENDS:
			return {
				...state,
				friends: action.payload,
			};
		case actionTypes.CANCEL_FRIENDSHIP:
			return {
				...state,
				friends: state.friends!.filter(
					friend => friend._id !== action.payload.friendId
				),
			};
		default:
			return state;
	}
};
