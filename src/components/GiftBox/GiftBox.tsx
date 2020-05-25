import React from 'react';

// MUI
import {
	ExpansionPanel,
	ExpansionPanelActions,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from '@material-ui/core';
import {
	LockOpen,
	MonetizationOn,
	Link,
	Description,
	ExpandMore,
} from '@material-ui/icons';

// Types
interface GiftBoxProps {
	_id: string;
	title: string;
	price: number;
	description?: string;
	link?: string;
	cancelReservation: ({ wishId }: { wishId: string }) => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({
	_id,
	title,
	description,
	price,
	link,
	cancelReservation,
}) => {
	const handleClickCancel = () => {
		console.log(_id);
		cancelReservation({ wishId: _id });
	};
	return (
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMore />}>
				{title}
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<List disablePadding>
					<ListItem>
						<ListItemIcon>
							<MonetizationOn />
						</ListItemIcon>
						<ListItemText
							primary={price + ' zł'}
							secondary="Orientacyjna cena"
						/>
					</ListItem>
					{link && (
						<ListItem button component="a" href={link}>
							<ListItemIcon>
								<Link />
							</ListItemIcon>
							<ListItemText primary="Zobacz specyfikację lub zdjęcie" />
						</ListItem>
					)}
					{description && (
						<ListItem>
							<ListItemIcon>
								<Description />
							</ListItemIcon>
							<ListItemText>{description}</ListItemText>
						</ListItem>
					)}
				</List>
			</ExpansionPanelDetails>
			<ExpansionPanelActions>
				<Button
					startIcon={<LockOpen />}
					color="secondary"
					onClick={handleClickCancel}
				>
					Anuluj deklarancję zakupu
				</Button>
			</ExpansionPanelActions>
		</ExpansionPanel>
	);
};
export default GiftBox;
