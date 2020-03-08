import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

//Styles
// import * as Styled from './stylesNavBar';

// Components
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';

const NavBar = () => {
	const [navOpened, setNavOpened] = useState(false);
	const handleToggleDrawer = () => {
		setNavOpened(prev => !prev);
	};
	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleToggleDrawer}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<NavigationDrawer
				opened={navOpened}
				toggleNavigationDrawer={handleToggleDrawer}
			/>
		</>
	);
};
export default NavBar;
