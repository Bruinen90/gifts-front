import React from 'react';

// MUI
import { Drawer, Box } from '@material-ui/core';

// Components
import NavigationList from '../NavigationList/NavigationList';
import SignInUpOut from '../SignInUpOut/SignInUpOut';

interface NavigationDrawerProps {
	opened: boolean;
	toggleNavigationDrawer: () => void;
	username?: string;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
	opened,
	toggleNavigationDrawer,
	username,
}) => {
	return (
		<Drawer anchor="right" open={opened} onClose={toggleNavigationDrawer}>
			<Box
				paddingY="30px"
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				height="100%"
				style={{ minWidth: '280px' }}
			>
				<NavigationList
					hideDrawer={toggleNavigationDrawer}
					view="modal"
					userLoggedIn={username !== undefined}
				/>
				<SignInUpOut
					variant="vertical"
					closeDrawer={toggleNavigationDrawer}
					username={username}
				/>
			</Box>
		</Drawer>
	);
};
export default NavigationDrawer;
