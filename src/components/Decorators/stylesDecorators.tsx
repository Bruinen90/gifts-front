import { styled, Theme } from '@material-ui/core/styles';

interface DecoIconProps {
	theme: Theme;
	left: number;
	top: number;
}

export const DecoIcon = styled('img')(
	({ theme, left, top }: DecoIconProps) => ({
		width: '0.66vh',
		height: '0.66vh',
		position: 'absolute',
		left: left + '%',
		top: top + '%',
		zIndex: 0,
		[theme.breakpoints.up('sm')]: {
			width: '10px',
			height: '10px',
		},
	})
);
