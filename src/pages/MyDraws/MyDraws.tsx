import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

// MUI
import { Typography, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

// Components
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import DrawRow from '../../components/DrawRow/DrawRow';

// Interfaces
import {
	DrawInterface,
	StateInterface,
	User,
} from '../../interfaces/interfaces';

const MyDraws: React.FC = () => {
	const location = useLocation();
	const [usersDraws, userId] = useSelector((state: StateInterface) => [
		state.usersDraws,
		state.userId,
	]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: 'WATCH_GET_USER_DRAWS_LIST',
			payload: { userId: userId },
		});
	}, [dispatch, userId, usersDraws]);

	// Snackbar
	const [snackbar, setSnackbar] = useState({ opened: false, message: '' });

	const handleCloseSnackbar = () => {
		setSnackbar({ opened: false, message: '' });
	};

	// Create new draw snackbar
	useEffect(() => {
		const locState = location.state as {
			drawTitle?: string;
			edit?: boolean;
		};
		if (locState && locState.drawTitle) {
			setSnackbar({
				opened: true,
				message: `Poprawnie ${
					locState.edit
						? 'zapisano zmiany w losowaniu '
						: 'utworzono losowanie '
				} ${locState.drawTitle}`,
			});
		}
	}, [location.state]);

	// Delete draw
	const dispatchDeleteDraw = (drawId: string, drawTitle: string) => {
		dispatch({
			type: 'DELETE_DRAW_WATCHER',
			payload: { drawId: drawId },
		});
		setSnackbar({
			opened: true,
			message: `Poprawnie usunięto losowanie ${drawTitle}`,
		});
	};

	// Exit draw
	const dispatchExitDraw = (drawId: string, drawTitle: string) => {
		dispatch({
			type: 'EXIT_DRAW_WATCHER',
			payload: { drawId: drawId },
		});
		setSnackbar({
			opened: true,
			message: `Opuszczono losowanie ${drawTitle}`,
		});
	};

	// Run draw
	const dispatchRunDraw = (drawId: string, drawTitle: string) => {
		dispatch({ type: 'RUN_DRAW_WATCHER', payload: { drawId: drawId } });
	};
	return (
		<>
			<PageWrapper>
				<Typography variant="h4" component="h2" align="center">
					Moje losowania
				</Typography>
				<Grid container spacing={2}>
					{usersDraws &&
						usersDraws.map((draw: DrawInterface) => {
							if (draw.results) {
								return (
									<DrawRow
										title={draw.title}
										date={draw.date as Date}
										_id={draw._id}
										key={draw._id}
										results={draw.results}
										creator={draw.creator as User}
										participants={
											draw.participants as [User]
										}
										adminMode={draw.creator._id === userId}
										price={draw.price}
										deleteDraw={dispatchDeleteDraw}
										exitDraw={dispatchExitDraw}
										runDraw={dispatchRunDraw}
									/>
								);
							} else {
								return (
									<DrawRow
										title={draw.title}
										date={draw.date as Date}
										_id={draw._id}
										key={draw._id}
										creator={draw.creator as User}
										participants={
											draw.participants as [User]
										}
										adminMode={draw.creator._id === userId}
										price={draw.price}
										deleteDraw={dispatchDeleteDraw}
										exitDraw={dispatchExitDraw}
										runDraw={dispatchRunDraw}
									/>
								);
							}
						})}
				</Grid>
			</PageWrapper>
			{/* Confirmation snackbar when redirected from creating new draw */}
			<Snackbar
				open={snackbar.opened}
				autoHideDuration={7000}
				onClose={handleCloseSnackbar}
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleCloseSnackbar}
					severity="success"
				>
					{snackbar.message}
				</MuiAlert>
			</Snackbar>
		</>
	);
};
export default MyDraws;
