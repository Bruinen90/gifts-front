import React, { ReactElement } from 'react';

//Styles
// import * as Styled from './stylesNavigationItem';

// Components
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

interface NavigationItemProps {
	icon: ReactElement;
	text: string;
}

const NavigationItem = ({ icon, text }: NavigationItemProps) => (
	<ListItem button>
		<ListItemIcon>{icon}</ListItemIcon>
		<ListItemText>{text}</ListItemText>
	</ListItem>
);

export default NavigationItem;
