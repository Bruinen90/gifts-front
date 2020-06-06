import { styled, Card } from '@material-ui/core';

export const WishCard = styled(Card)(() => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
}));

export const ReservedOverlay = styled('div')({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '2rem',
	backgroundColor: 'rgba(255,255,255,0.75)',
});
