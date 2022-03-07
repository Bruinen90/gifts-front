import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Types
import { State } from '../../types/State';

// MUI
import { AppBar, Box, IconButton, Hidden, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

//Styles
import * as Styled from './stylesNavBar';

// Components
import { NavigationDrawer } from '../NavigationDrawer/NavigationDrawer';
import { SignInUpOut } from '../SignInUpOut/SignInUpOut';
import { NavigationList } from '../NavigationList/NavigationList';
import { LogoBox } from '../LogoBox/LogoBox';
import NotificationsBox from '../NotificationsBox/NotificationsBox';

export const NavBar: React.FC = () => {
	const username = useSelector((state: State) => state.auth.username);

	const [navOpened, setNavOpened] = useState(false);
	const [
		notificationsAnchoEl,
		setNotificationsAnchoEl,
	] = useState<null | HTMLElement>(null);
	const notificationsOpened = Boolean(notificationsAnchoEl);
	const handleToggleDrawer = () => {
		setNavOpened(prev => !prev);
	};
	const handleOpenNotifications = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setNotificationsAnchoEl(event.currentTarget);
	};
	const handleCloseNotifications = () => {
		setNotificationsAnchoEl(null);
	};

	const notificationsArray = useSelector(
		(state: State) => state.notifications.notifications
	);
	return (
		<AppBar position='sticky'>
			<Styled.ToolbarCont>
				<LogoBox />

				<Box display='flex' alignItems='center'>
					<Hidden mdDown>
						<NavigationList
							view='horizontal'
							userLoggedIn={username !== undefined}
						/>
					</Hidden>
					<IconButton
						color='inherit'
						aria-label='powiadomienia'
						onClick={handleOpenNotifications}
						disabled={notificationsArray.length === 0}
					>
						<Badge
							badgeContent={notificationsArray.length}
							color='secondary'
						>
							<NotificationsActiveIcon />
						</Badge>
					</IconButton>
					<NotificationsBox
						opened={notificationsOpened}
						handleClose={handleCloseNotifications}
						anchorEl={notificationsAnchoEl}
						notifications={notificationsArray}
					/>
					<Hidden mdDown>
						<SignInUpOut username={username} variant='horizontal' />
					</Hidden>
					<Hidden lgUp>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={handleToggleDrawer}
						>
							<MenuIcon />
						</IconButton>
						<NavigationDrawer
							opened={navOpened}
							toggleNavigationDrawer={handleToggleDrawer}
							username={username}
						/>
					</Hidden>
				</Box>
			</Styled.ToolbarCont>
		</AppBar>
	);
};
export default NavBar;
