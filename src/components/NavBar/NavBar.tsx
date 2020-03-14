import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	AppBar,
	IconButton,
	Button,
	ButtonGroup,
	Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

//Styles
import * as Styled from './stylesNavBar';

// Components
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';

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
					<Hidden smDown>
						<ButtonGroup>
							<Button
								component={RouterLink}
								to="/logowanie"
								color="secondary"
								variant="contained"
							>
								Zaloguj się
							</Button>
							<Button
								component={RouterLink}
								to="/rejestracja"
								color="secondary"
								variant="contained"
							>
								Utwórz konto
							</Button>
						</ButtonGroup>
					</Hidden>
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
