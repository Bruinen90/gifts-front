import { styled, Card } from '@material-ui/core';

interface WishCardProps {
	reserved: number;
}

export const WishCard = styled(Card)(({ reserved }: WishCardProps) => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	opacity: reserved > 0 ? '0.15' : '1',
	pointerEvents: reserved > 0 ? 'none' : 'all',
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
});
