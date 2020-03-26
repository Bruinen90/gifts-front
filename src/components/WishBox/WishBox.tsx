import React, { useState } from 'react';

// MUI
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
} from '@material-ui/core';

// Icons
import {
	Edit,
	Delete,
	Check,
	Link,
	MonetizationOn,
	Description,
} from '@material-ui/icons';
// Types
import { Wish } from '../../interfaces/WishTypes';

interface WishBoxProps {
	wish: Wish;
	view: 'full' | 'simple';
	deleteWish: (_: React.MouseEvent) => void;
}

const WishBox: React.FC<WishBoxProps> = ({ wish, view, deleteWish }) => (
	<Card key={wish._id} style={{ margin: '1rem 0', padding: '1rem' }}>
		<CardHeader title={wish.title} />
		<CardContent>
			<List disablePadding>
				<ListItem>
					<ListItemIcon>
						<MonetizationOn />
					</ListItemIcon>
					<ListItemText
						primary={wish.price + ' zł'}
						secondary="Orientacyjna cena"
					/>
				</ListItem>
				{wish.link && (
					<ListItem button component="a" href={wish.link}>
						<ListItemIcon>
							<Link />
						</ListItemIcon>
						<ListItemText primary="Zobacz specyfikację lub zdjęcie" />
					</ListItem>
				)}
				{wish.description && (
					<ListItem>
						<ListItemIcon>
							<Description />
						</ListItemIcon>
						<ListItemText>{wish.description}</ListItemText>
					</ListItem>
				)}
			</List>
		</CardContent>
		<CardActions>
			{view === 'full' ? (
				<>
					<Button
						color="secondary"
						startIcon={<Delete />}
						onClick={deleteWish}
					>
						Usuń
					</Button>
					<Button color="primary" startIcon={<Edit />}>
						Edytuj
					</Button>
				</>
			) : (
				<Button color="primary" startIcon={<Check />}>
					Kupię to
				</Button>
			)}
		</CardActions>
	</Card>
);
export default WishBox;
