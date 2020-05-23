import React from 'react';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
} from '@material-ui/core';

interface Props {
	opened: boolean;
	toggleDialog: () => void;
	title: string;
	description?: string;
	confirmFunction: (_: any) => any;
	acceptText?: string;
	cancelText?: string;
}

const ConfirmationDialog: React.FC<Props> = ({
	opened,
	toggleDialog,
	title,
	description,
	confirmFunction,
	acceptText = 'Potwierdź',
	cancelText = 'Anuluj',
}) => {
	return (
		<Dialog open={opened} onClose={toggleDialog}>
			<DialogTitle>{title}</DialogTitle>
			{description && (
				<DialogContent>
					<DialogContentText>{description}</DialogContentText>
				</DialogContent>
			)}
			<DialogActions>
				<Button onClick={confirmFunction} color="primary">
					{acceptText}
				</Button>
				<Button onClick={toggleDialog} color="secondary">
					{cancelText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default ConfirmationDialog;
