import { styled } from '@material-ui/core/styles';

interface DecoIconProps {
	left: number;
	top: number;
}

export const DecoIcon = styled('img')(({ left, top }: DecoIconProps) => ({
	width: '10px',
	height: '10px',
	position: 'absolute',
	left: left + '%',
	top: top + '%',
}));
