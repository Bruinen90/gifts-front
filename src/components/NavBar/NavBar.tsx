import React, { useState } from 'react';
import {
	AppBar,
	IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

//Styles
import * as Styled from './stylesNavBar';

// Components
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import SignInUpOut from '../SignInUpOut/SignInUpOut';

const NavBar = () => {
	const [navOpened, setNavOpened] = useState(false);
	const handleToggleDrawer = () => {
		setNavOpened(prev => !prev);
	};
	return (
		<>
			<AppBar position="sticky">
				<Styled.ToolbarCont>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleToggleDrawer}
					>
						<MenuIcon />
					</IconButton>
					<SignInUpOut />
				</Styled.ToolbarCont>
			</AppBar>
			<NavigationDrawer
				opened={navOpened}
				toggleNavigationDrawer={handleToggleDrawer}
			/>
		</>
	);
};
export default NavBar;
