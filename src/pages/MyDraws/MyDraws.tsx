import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// MUI
import { Typography, List } from '@material-ui/core';

// Components
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import DrawRow from '../../components/DrawRow/DrawRow';

// Interfaces
import { DrawInterface, StateInterface } from '../../interfaces/interfaces';

const MyDraws = () => {
	const usersDraws = useSelector((state: StateInterface) => state.usersDraws);
	return (
		<PageWrapper>
			<Typography variant="h4" component="h2">
				Moje losowania
			</Typography>
			<List>
				{usersDraws &&
					usersDraws.map((draw: DrawInterface) => (
						<DrawRow
							title={draw.title}
                            date={draw.date}
                            // Replace with _id when backend addded!!!
							key={draw.title}
						/>
					))}
				<DrawRow title="Losowanie 2020!!!" date={new Date()} />
			</List>
		</PageWrapper>
	);
};
export default MyDraws;
