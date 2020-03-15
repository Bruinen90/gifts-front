import React from 'react';
import { Drawer, List, Box, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

// Components
import NavigationItem from '../NavigationItem/NavigationItem';

// Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListIcon from '@material-ui/icons/List';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import PeopleIcon from '@material-ui/icons/People';

interface NavigationDrawerProps {
	opened: boolean;
	toggleNavigationDrawer: () => void;
}

const NavigationDrawer = ({
	opened,
	toggleNavigationDrawer,
}: NavigationDrawerProps) => {
	return (
		<Drawer anchor="left" open={opened} onClose={toggleNavigationDrawer}>
			<Box
				paddingY="30px"
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				height="100%"
			>
				<List>
					<NavigationItem
						target="/nowe-losowanie"
						icon={<AddCircleIcon />}
						text="Stwórz nowe losowanie"
						hideDrawer={toggleNavigationDrawer}
					/>
					<NavigationItem
						target="/moje-losowania"
						icon={<ListIcon />}
						text="Moje losowania"
						hideDrawer={toggleNavigationDrawer}
					/>
					<NavigationItem
						target="/lista-zyczen"
						icon={<CardGiftcardIcon />}
						text="Lista życzeń"
						hideDrawer={toggleNavigationDrawer}
					/>
					<NavigationItem
						target="/znajomi"
						icon={<PeopleIcon />}
						text="Znajomi"
						hideDrawer={toggleNavigationDrawer}
					/>
				</List>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="space-between"
					height="90px"
					width="80%"
					margin="0 auto"
				>
					<Button
						component={RouterLink}
						to="/logowanie"
						color="secondary"
						variant="contained"
						onClick={toggleNavigationDrawer}
					>
						Zaloguj się
					</Button>
					<Button
						component={RouterLink}
						to="/rejestracja"
						color="secondary"
						variant="contained"
						onClick={toggleNavigationDrawer}
					>
						Utwórz konto
					</Button>
				</Box>
			</Box>
		</Drawer>
	);
};
export default NavigationDrawer;
