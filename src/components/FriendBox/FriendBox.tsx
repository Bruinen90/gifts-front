import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as watcherTypes from '../../store/actions/watcherTypes';

// MUI
import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Button,
	IconButton,
	Theme,
} from '@material-ui/core';
import { CardGiftcard, PersonAddDisabled } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';

interface FriendBoxProps {
	_id: string;
	username: string;
	email?: string;
}

export const FriendBox: React.FC<FriendBoxProps> = ({
	_id,
	username,
	email,
}) => {
	const dispatch = useDispatch();
	const theme: Theme = useTheme();
	const minWidth = useMediaQuery(theme.breakpoints.up('md'));

	const handleCancelFriendship = () => {
		console.log('Canceling friendship with: ', _id);
		dispatch({
			type: watcherTypes.WATCH_CANCEL_FRIENDSHIP,
			payload: { friendId: _id },
		});
	};
	return (
		<ListItem>
			<ListItemText primary={username} secondary={email} />

			<ListItemSecondaryAction
				style={{ right: minWidth ? 'default' : 0 }}
			>
				<Button
					color="primary"
					startIcon={<CardGiftcard />}
					style={{ marginRight: `${minWidth ? '1rem' : '0.25rem'}` }}
					size={minWidth ? 'medium' : 'small'}
				>
					Lista życzeń
				</Button>
				{minWidth ? (
					<Button
						color="secondary"
						onClick={handleCancelFriendship}
						startIcon={<PersonAddDisabled />}
					>
						Usuń z listy znajomych
					</Button>
				) : (
					<IconButton
						onClick={handleCancelFriendship}
						style={{ paddingRight: 0 }}
						size="small"
						color="secondary"
					>
						<PersonAddDisabled />
					</IconButton>
				)}
			</ListItemSecondaryAction>
		</ListItem>
	);
};
