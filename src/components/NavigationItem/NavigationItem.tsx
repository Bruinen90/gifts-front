import React from 'react';
import { Link } from 'react-router-dom';

//Styles
// import * as Styled from './stylesNavigationItem';

// Components
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

interface NavigationItemProps {
	target: string;
	icon: JSX.Element;
	text: string;
}

const NavigationItem = ({ target, icon, text }: NavigationItemProps) => (
	<Link to={target} style={{ textDecoration: 'none', color: 'inherit' }}>
		<ListItem button>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText>{text}</ListItemText>
		</ListItem>
	</Link>
);

export default NavigationItem;
