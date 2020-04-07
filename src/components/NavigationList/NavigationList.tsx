import React from 'react';

// MUI
import { List } from '@material-ui/core';
import { AddCircle, CardGiftcard, HelpOutline, People } from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';

// Components
import NavigationItem from '../NavigationItem/NavigationItem';

interface NavigationListProps {
	hideDrawer?: () => void;
	view: 'modal' | 'horizontal';
	userLoggedIn: boolean;
}

const USER_ITEMS_LIST = [
	{
		target: '/nowe-losowanie',
		icon: <AddCircle color="inherit" />,
		text: 'Stwórz nowe losowanie',
	},
	{
		target: '/moje-losowania',
		icon: <ListIcon color="inherit" />,
		text: 'Moje losowania',
	},
	{
		target: '/lista-zyczen',
		icon: <CardGiftcard color="inherit" />,
		text: 'Lista życzeń',
	},
	{
		target: '/moi-znajomi',
		icon: <People color="inherit" />,
		text: 'Moi znajomi',
	},
];

const GUEST_ITEMS_LIST = [
	{
		target: '/jak-zaczac',
		icon: <HelpOutline color="inherit" />,
		text: 'Jak zacząć',
	},
];

const NavigationList: React.FC<NavigationListProps> = ({
	hideDrawer,
	view,
	userLoggedIn,
}) => {
	const listItems = userLoggedIn ? USER_ITEMS_LIST : GUEST_ITEMS_LIST;
	return (
		<List style={{ display: view === 'horizontal' ? 'flex' : 'default' }}>
			{listItems.map(item => {
				if (view === 'modal') {
					return (
						<NavigationItem
							target={item.target}
							icon={item.icon}
							text={item.text}
							hideDrawer={hideDrawer!}
							key={item.target + item.text}
						/>
					);
				} else {
					return (
						<NavigationItem
							target={item.target}
							text={item.text}
							icon={item.icon}
							key={item.target + item.text}
						/>
					);
				}
			})}
		</List>
	);
};

export default NavigationList;
