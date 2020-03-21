import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import { Box, TextField, Typography } from '@material-ui/core';

// Icons
import { Search } from '@material-ui/icons';

const FindUser = () => {
	const dispatch = useDispatch();
	const [searchPhrase, setSearchPhrase] = useState('');

	let typingTimeout: number;
	const onStopTyping = () => {
		if (searchPhrase.length > 0) {
			console.log('looking for...', searchPhrase);
		}
	};
	useEffect(() => {
		window.clearTimeout(typingTimeout);
		typingTimeout = window.setTimeout(onStopTyping, 1000);
		return () => window.clearTimeout(typingTimeout);
	}, [searchPhrase]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchPhrase(event.target.value);
	};
	return (
		<>
			<Typography
				variant="h6"
				component="h6"
				style={{ marginTop: '1rem' }}
			>
				Dodaj uczestników
			</Typography>
			<TextField
				label="Nazwa użytkownika lub email"
				onChange={handleInputChange}
				value={searchPhrase}
			/>
			<Box
				width="100%"
				minHeight="90px"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Search fontSize="large" opacity={0.25} />
			</Box>
		</>
	);
};
export default FindUser;
