import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';

interface EmptyListMessageProps {
	imageUrl: string;
	message: string;
	button?: {
		caption: string;
		action: () => void;
	};
}

const EmptyListMessage: React.FC<EmptyListMessageProps> = ({
	imageUrl,
	message,
	button,
}) => (
	<Box
		display="flex"
		flexDirection="column"
		alignItems="center"
		textAlign="center"
		padding={2}
		width="300px"
		margin="auto"
		maxWidth="80%"
	>
		<img
			src={imageUrl}
			alt=""
			style={{ width: '300px', maxWidth: '80%' }}
		/>
		<Typography style={{ margin: '2rem 0' }}>{message}</Typography>
		{button && (
			<Button onClick={button.action} variant="contained" color="primary">
				{button.caption}
			</Button>
		)}
	</Box>
);

export default EmptyListMessage;
