import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as watcherTypes from '../../store/actions/watcherTypes';

// Components
import WishesModal from '../WishesModal/WishesModal';

// MUI
import {
	ListItem,
	ListItemText,
	Button,
	IconButton,
	Theme,
	Grid,
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
		dispatch({
			type: watcherTypes.WATCH_CANCEL_FRIENDSHIP,
			payload: { friendId: _id, friendUsername: username },
		});
	};

	// Wisheslist
	const [wishesDialogOpened, setWishesDialogOpened] = useState(false);
	const handleToggleWishesDialog = () => {
		setWishesDialogOpened(prev => !prev);
	};

	return (
		<>
			<ListItem>
				<Grid container>
					<Grid item xs={12} sm={5}>
						<ListItemText primary={username} secondary={email} />
					</Grid>
					<Grid
						item
						xs={12}
						sm={7}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}
					>
						<Button
							color="primary"
							startIcon={<CardGiftcard />}
							style={{
								marginRight: `${minWidth ? '1rem' : '0.25rem'}`,
								whiteSpace: 'nowrap',
							}}
							size={minWidth ? 'medium' : 'small'}
							onClick={handleToggleWishesDialog}
						>
							Lista życzeń
						</Button>
						{minWidth ? (
							<Button
								color="secondary"
								onClick={handleCancelFriendship}
								startIcon={<PersonAddDisabled />}
								style={{ whiteSpace: 'nowrap' }}
							>
								Usuń ze znajomych
							</Button>
						) : (
							<IconButton
								onClick={handleCancelFriendship}
								style={{ paddingRight: 0 }}
								size="small"
								color="secondary"
							>
								<PersonAddDisabled color="inherit" />
							</IconButton>
						)}
					</Grid>
				</Grid>
			</ListItem>
			{wishesDialogOpened && (
				<WishesModal
					userId={_id}
					username={username}
					opened={wishesDialogOpened}
					toggle={handleToggleWishesDialog}
				/>
			)}
		</>
	);
};
